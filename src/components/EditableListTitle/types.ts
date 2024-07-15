export type EditableListPropsType = {
  title: string;
  changeTitle: (title: string) => void;
  disabled?: boolean;
}