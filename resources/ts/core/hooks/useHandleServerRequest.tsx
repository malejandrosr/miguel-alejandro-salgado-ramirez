import { UseFormSetError } from "react-hook-form";
import { showNotification } from "@mantine/notifications";
import { IconX as X } from "@tabler/icons-react";

const useHandleServerRequest = () => {
	const handleServerRequest = async (onRequesting: () => Promise<void>, setError?: UseFormSetError<any>) => {
		try {
			await onRequesting();
		} catch (error) {
			const { data: errorObject } = error as GENERAL.IServerError;

			console.log(error);

			if (errorObject.code === 422) {
				if (typeof setError === "function") {
					// handle form validation
					// handle your own validation server errors from selected backend
					// this is a Laravel example
					// by the way don't use it if it's not necessary
					Object.entries(errorObject.message as Record<string, any>).map((error) => {
						setError(error[0], {
							message: error[1].join("<br />"),
						});
					});
				}
			} else {
				// Show a custom message with any other status code
				showNotification({
					message: errorObject.message as string,
					color: "red",
					icon: <X size={16} />,
				});
			}
		}
	};

	return {
		handleServerRequest,
	};
};

export default useHandleServerRequest;
