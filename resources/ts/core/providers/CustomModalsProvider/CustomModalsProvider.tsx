import { useMantineTheme } from "@mantine/core";
import { ModalsProvider as MantineModalsProvider } from "@mantine/modals";

const CustomModalsProvider = ({ children, modals }: CORE.Providers.ICustomModalsProvider) => {
	const theme = useMantineTheme();

	return (
		<MantineModalsProvider
			modals={modals}
			modalProps={{
				centered: true,
				closeOnEscape: true,
				closeOnClickOutside: true,
				styles: {
					title: {
						fontWeight: 600,
						fontSize: "16px",
						lineHeight: "155%",
					},
					overlay: {
						backdropFilter: "blur(2px)",
						background: "rgba(0, 0, 0, 0.25)",
					},
					header: {
						padding: "10px 20px !important",
						borderBottom: `solid 1px ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]} !important`,
						margin: "0 !important",
					},
					body: {
						padding: 0,
						paddingBottom: 8,
					},
				},
			}}
		>
			{children}
		</MantineModalsProvider>
	);
};

export default CustomModalsProvider;
