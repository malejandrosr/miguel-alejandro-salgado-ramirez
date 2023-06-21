import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@mantine/core";

const RHFTextarea = ({ label, name, autosize = false, ...rest }: CORE.Components.IRHFTextarea) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Textarea {...field} id={name} label={label} error={error?.message} autosize={autosize} {...rest} />
			)}
		/>
	);
};

export default RHFTextarea;
