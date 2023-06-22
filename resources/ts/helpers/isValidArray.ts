const isValidArray = (arr: any, minLength = 0): arr is any[] =>
	arr && Array.isArray(arr) && arr.length > minLength;

export default isValidArray;
