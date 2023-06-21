/**
 * Helpers types
 *
 * @author Miguel Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
declare namespace HELPERS {
	/**
	 * Interface for buildFormData helper
	 */
	export interface IBuildFormData {
		indexes?: boolean;
		nullsAsUndefineds?: boolean;
		booleansAsIntegers?: boolean;
		allowEmptyArrays?: boolean;
		noFilesWithArrayNotation?: boolean;
		dotsForObjectNotation?: boolean;
	}
}
