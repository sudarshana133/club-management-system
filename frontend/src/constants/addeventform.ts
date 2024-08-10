type FormFieldName = "title" | "description" | "venue" | "date" | "clubId";

interface FormElement {
  name: FormFieldName;
  labelName: string;
  placeholder: string;
  type: string;
}
export const formElements: FormElement[] = [
    {
        name: "title",
        type: "text",
        labelName: "Title",
        placeholder: "Title",
    },
    {
        name: "description",
        type: "text",
        labelName: "Description",
        placeholder: "Description",
    },
    {
        name: "venue",
        type: "text",
        labelName: "Venue",
        placeholder: "Venue",
    },
    {
        name: "date",
        type: "date",
        labelName: "Date",
        placeholder: "Date",
    }
]
