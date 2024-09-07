/**
 * Formats a list of ratings into a string representation of the average rating.
 * @param {number[]} ratingList - A list of ratings.
 * @returns {string} A string representation of the average rating, e.g. "4.50".
 */
export default function formattedRating(ratingList: number[]): string {
    if (ratingList.length === 0) return "0.00"; 
    const total = ratingList.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratingList.length;
    return average.toFixed(2); 
}
