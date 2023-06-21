import { Controller, useFormContext } from "react-hook-form";
import { MultiSelect } from "@mantine/core";

const RHFMultiSelect = ({ label, name, clearable = true, data, ...rest }: CORE.Components.IRHFMultiSelect) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<MultiSelect {...field} id={name} label={label} error={error?.message} data={data} clearable={clearable} searchable {...rest} />
			)}
		/>
	);
};

export default RHFMultiSelect;
