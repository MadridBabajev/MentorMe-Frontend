// src/utils/measureTfjs.ts
import * as tf from "@tensorflow/tfjs";

/**
 * Fetch the model.json + all binary weight shards (HEAD only)
 * to compute the total on-disk size in bytes.
 */
async function fetchModelSize(modelJsonUrl: string): Promise<number> {
    // 1) Resolve the manifest URL absolutely
    const manifestUrl = new URL(modelJsonUrl, window.location.href).href;

    // 2) Fetch and parse it
    const manifest = await fetch(manifestUrl).then(r => r.json());
    let total = 0;

    // 3) Count the manifest JSON size
    total += new TextEncoder().encode(JSON.stringify(manifest)).length;

    // 4) Compute base path for shards
    const basePath = manifestUrl.substring(0, manifestUrl.lastIndexOf('/') + 1);

    // 5) HEAD each shard to get its Content-Length
    await Promise.all(
        manifest.weightsManifest.flatMap((group: any) =>
            group.paths.map(async (path: string) => {
                // now `basePath` is an absolute URL
                const url = new URL(path, basePath).href;
                const head = await fetch(url, { method: "HEAD" });
                const len  = head.headers.get("Content-Length");
                total += len ? parseInt(len, 10) : 0;
            })
        )
    );

    return total;
}

/**
 * Measure load time, model size, inference time, TFJS memory usage.
 *
 * @param loadFn  async fn that loads the model (e.g. () => tf.loadGraphModel(url))
 * @param inferFn async fn that does inference and returns a tensor (or array)
 */
export async function measureModel<T>(
    modelUrl: string,
    loadFn: () => Promise<T>,
    inferFn: (model: T) => Promise<any>
) {
    const perf = window.performance;
    // --- LOAD METRICS ---
    const t0 = perf.now();
    const model = await loadFn();
    const loadTime = perf.now() - t0;

    const modelSizeBytes = await fetchModelSize(modelUrl);

    // --- MEMORY BEFORE ---
    const tfMemBefore = tf.memory().numBytes;
    const jsHeapBefore = (performance as any).memory?.usedJSHeapSize ?? null;

    // --- INFERENCE METRICS ---
    const t1 = perf.now();
    const out = await inferFn(model);
    // if it’s a tensor, force evaluation:
    if (out instanceof tf.Tensor) {
        await out.data();
        out.dispose();
    }
    const inferenceTime = perf.now() - t1;

    // --- MEMORY AFTER ---
    const tfMemAfter = tf.memory().numBytes;
    const jsHeapAfter = (performance as any).memory?.usedJSHeapSize ?? null;

    return {
        loadTime,                    // ms
        modelSizeBytes,             // bytes
        inferenceTime,              // ms
        tfMemDelta: tfMemAfter - tfMemBefore,
        tfMemBefore,
        tfMemAfter,
        jsHeapBefore,               // bytes or null
        jsHeapAfter,                // bytes or null
    };
}
