import { Controller, useFormContext } from "react-hook-form";
import { Select } from "@mantine/core";

const RHFSelect = ({
	label,
	name,
	clearable = true,
	data,
	...rest
}: CORE.Components.IRHFSelect) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Select
					{...field}
					id={name}
					label={label}
					error={error?.message}
					data={data}
					clearable={clearable}
					searchable
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFSelect;
