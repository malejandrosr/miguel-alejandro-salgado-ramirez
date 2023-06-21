import { FormProvider as Form } from "react-hook-form";

const FormProvider = ({ children, onSubmit, methods }: CORE.Components.IFormProvider) => {
	return (
		<Form {...methods}>
			<form onSubmit={onSubmit}>{children}</form>
		</Form>
	);
};

export default FormProvider;
