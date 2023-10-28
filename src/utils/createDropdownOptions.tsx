export default function createDropdownOptions(values: string[] | undefined) {
    if (!values) {
        return []
      } 
      return values.map(value => ({
        label: value,
        value: value,
      }));
    }