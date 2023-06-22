import { useFormContext, Controller } from "react-hook-form";
import { FileInput } from "@mantine/core";

import ValueComponent from "./ValueComponent";

const RHFFileInput = ({
	label,
	name,
	multiple = false,
	...rest
}: CORE.Components.IRHFFileInput) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<FileInput
					{...field}
					id={name}
					label={label}
					error={error?.message}
					clearable
					multiple={multiple}
					valueComponent={ValueComponent}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFFileInput;
