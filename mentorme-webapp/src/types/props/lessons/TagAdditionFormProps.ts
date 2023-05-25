
export interface TagAdditionFormProps {
    handleTagAddition: (param: { lessonId: string; name: string; description: string }) => void;
    handleCloseAddTagModal: () => void;
    lessonId: string;
}