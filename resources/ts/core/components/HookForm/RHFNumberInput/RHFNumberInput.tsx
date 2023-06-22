import { Controller, useFormContext } from "react-hook-form";
import { NumberInput } from "@mantine/core";

const RHFNumberInput = ({ label, name, ...rest }: CORE.Components.IRHFNumberInput) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<NumberInput {...field} id={name} label={label} error={error?.message} {...rest} />
			)}
		/>
	);
};

export default RHFNumberInput;
