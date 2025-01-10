export class AmountUtils {
  /**
   * Converts a string (potentially containing a '$' symbol) into an integer.
   * @param amount - The amount string to parse.
   * @returns The parsed integer value. Returns 0 if the input is null, undefined, or invalid.
   */
  static parseAmount(amount: string | null | undefined): number {
    if (!amount) return 0;
    // Remove the '$' symbol and convert to an integer.
    return parseInt(amount.replace('$', '')) || 0;
  }

  /**
   * Formats a number into a currency string prefixed with a '$' symbol.
   * @param amount - The numeric amount to format.
   * @returns A formatted currency string, e.g., "$1234".
   */
  static formatToCurrency(amount: number): string {
    return `$${amount}`;
  }

  /**
   * Converts an input string to a simplified currency format.
   * @param amount - The input string representing a number.
   * @returns A formatted currency string prefixed with a '$' symbol.
   */
  static formatInputToAmount(amount: string): string {
    const numericAmount = this.parseAmount(amount);
    return this.formatToCurrency(numericAmount);
  }

  /**
   * Converts a currency string into an integer string for input fields.
   * @param amount - The currency string to convert.
   * @returns A string representing the numeric value without the '$' symbol.
   */
  static formatForInput(amount: string): string {
    return this.parseAmount(amount).toString();
  }
}
