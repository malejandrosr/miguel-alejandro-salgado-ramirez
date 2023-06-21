import { Controller, useFormContext } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar as Calendar } from "@tabler/icons-react";

const RHFDatePickerInput = ({
	label,
	name,
	placeholder = "Seleccionar...",
	locale = "es",
	format = "YYYY-MM-DD",
	...rest
}: CORE.Components.IRHFDatePickerInput) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<DatePickerInput
					{...field}
					id={name}
					label={label}
					error={error?.message}
					placeholder={placeholder}
					locale={locale}
					icon={<Calendar size={16} />}
					valueFormat={format}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFDatePickerInput;
