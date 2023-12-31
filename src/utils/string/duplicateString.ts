/**
 * Duplicate a string as many times as needed in `O(log_2(n))` operations.
 * @param content The string content to duplicate.
 * @param count The number of duplications.
 * @returns The string content duplicated as many times as needed.
 */
export function duplicateString(content: string, count: number) {
  let spaces = '';
  if(count <= 0) {
    return spaces;
  }
  let base = content;
  while(count > 0) {
    if(count % 2 === 1) {
      spaces = `${spaces}${base}`;
    }
    count = Math.floor(count / 2);
    base = `${base}${base}`;
  }
  
  return spaces;
}
