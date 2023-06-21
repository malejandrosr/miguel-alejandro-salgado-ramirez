const getInitials = (name: string) => {
	const regex = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
	const namesSplitted = [...name.matchAll(regex)];

	let initials = "";
	for (const nameSplitted of namesSplitted) {
		initials += nameSplitted[1] || "";
	}

	return initials.toUpperCase();
};

export default getInitials;
