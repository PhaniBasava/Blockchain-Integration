/**
 * Palindrome Implementation
 * Multiple approaches to check and generate palindromes
 */

class PalindromeChecker {
  /**
   * Method 1: Simple string comparison (case-insensitive)
   * Time Complexity: O(n), Space Complexity: O(n)
   */
  static isSimplePalindrome(str) {
    if (!str || typeof str !== 'string') return false;
    
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  /**
   * Method 2: Two-pointer approach (more memory efficient)
   * Time Complexity: O(n), Space Complexity: O(1)
   */
  static isPalindromeTwoPointer(str) {
    if (!str || typeof str !== 'string') return false;
    
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
      if (cleaned[left] !== cleaned[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }

  /**
   * Method 3: Recursive approach
   * Time Complexity: O(n), Space Complexity: O(n) due to call stack
   */
  static isPalindromeRecursive(str) {
    if (!str || typeof str !== 'string') return false;
    
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    function checkRecursive(s, start, end) {
      if (start >= end) return true;
      if (s[start] !== s[end]) return false;
      return checkRecursive(s, start + 1, end - 1);
    }
    
    return checkRecursive(cleaned, 0, cleaned.length - 1);
  }

  /**
   * Method 4: Check if a number is palindrome
   * Time Complexity: O(log n), Space Complexity: O(1)
   */
  static isNumberPalindrome(num) {
    if (num < 0) return false;
    if (num < 10) return true;
    
    const original = num;
    let reversed = 0;
    
    while (num > 0) {
      reversed = reversed * 10 + num % 10;
      num = Math.floor(num / 10);
    }
    
    return original === reversed;
  }

  /**
   * Generate the shortest palindrome by adding characters to the beginning
   * Time Complexity: O(n²), Space Complexity: O(n)
   */
  static generateShortestPalindrome(str) {
    if (!str || typeof str !== 'string') return '';
    
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    for (let i = 0; i < cleaned.length; i++) {
      const candidate = cleaned.slice(i).split('').reverse().join('') + cleaned;
      if (this.isPalindromeTwoPointer(candidate)) {
        return candidate;
      }
    }
    
    return cleaned;
  }

  /**
   * Find all palindromic substrings in a string
   * Time Complexity: O(n²), Space Complexity: O(n)
   */
  static findAllPalindromes(str) {
    if (!str || typeof str !== 'string') return [];
    
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const palindromes = new Set();
    
    // Check for odd-length palindromes
    for (let center = 0; center < cleaned.length; center++) {
      let left = center, right = center;
      while (left >= 0 && right < cleaned.length && cleaned[left] === cleaned[right]) {
        if (right - left + 1 > 1) { // Only include palindromes longer than 1 character
          palindromes.add(cleaned.substring(left, right + 1));
        }
        left--;
        right++;
      }
    }
    
    // Check for even-length palindromes
    for (let center = 0; center < cleaned.length - 1; center++) {
      let left = center, right = center + 1;
      while (left >= 0 && right < cleaned.length && cleaned[left] === cleaned[right]) {
        palindromes.add(cleaned.substring(left, right + 1));
        left--;
        right++;
      }
    }
    
    return Array.from(palindromes).sort((a, b) => b.length - a.length);
  }

  /**
   * Find the longest palindromic substring
   * Time Complexity: O(n²), Space Complexity: O(1)
   */
  static longestPalindrome(str) {
    if (!str || typeof str !== 'string') return '';
    
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let start = 0, maxLength = 1;
    
    function expandAroundCenter(left, right) {
      while (left >= 0 && right < cleaned.length && cleaned[left] === cleaned[right]) {
        const currentLength = right - left + 1;
        if (currentLength > maxLength) {
          start = left;
          maxLength = currentLength;
        }
        left--;
        right++;
      }
    }
    
    for (let i = 0; i < cleaned.length; i++) {
      expandAroundCenter(i, i);     // Odd length palindromes
      expandAroundCenter(i, i + 1); // Even length palindromes
    }
    
    return cleaned.substring(start, start + maxLength);
  }
}

// Utility functions
const PalindromeUtils = {
  /**
   * Clean string for palindrome checking (remove spaces, punctuation, case-insensitive)
   */
  cleanString: (str) => str.toLowerCase().replace(/[^a-z0-9]/g, ''),
  
  /**
   * Check if array is palindrome
   */
  isArrayPalindrome: (arr) => {
    if (!Array.isArray(arr)) return false;
    return JSON.stringify(arr) === JSON.stringify(arr.slice().reverse());
  },
  
  /**
   * Generate random palindrome of given length
   */
  generateRandomPalindrome: (length) => {
    if (length <= 0) return '';
    
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const half = Math.floor(length / 2);
    let palindrome = '';
    
    // Generate first half
    for (let i = 0; i < half; i++) {
      palindrome += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Add middle character for odd lengths
    if (length % 2 === 1) {
      palindrome += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Mirror the first half
    palindrome += palindrome.substring(0, half).split('').reverse().join('');
    
    return palindrome;
  }
};

// Demo and test cases
function runPalindromeTests() {
  console.log('=== Palindrome Tests ===\n');
  
  const testCases = [
    'racecar',
    'A man a plan a canal Panama',
    'race a car',
    'hello',
    '12321',
    'Madam',
    'Step on no pets',
    'Was it a car or a cat I saw?',
    ''
  ];
  
  console.log('String Palindrome Tests:');
  testCases.forEach(test => {
    console.log(`"${test}"`);
    console.log(`  Simple: ${PalindromeChecker.isSimplePalindrome(test)}`);
    console.log(`  Two-pointer: ${PalindromeChecker.isPalindromeTwoPointer(test)}`);
    console.log(`  Recursive: ${PalindromeChecker.isPalindromeRecursive(test)}`);
    console.log('');
  });
  
  console.log('Number Palindrome Tests:');
  const numberTests = [121, 12321, 123, -121, 0, 7];
  numberTests.forEach(num => {
    console.log(`${num}: ${PalindromeChecker.isNumberPalindrome(num)}`);
  });
  
  console.log('\nLongest Palindrome Tests:');
  const longTests = ['babad', 'cbbd', 'raceacar', 'abcdef'];
  longTests.forEach(test => {
    console.log(`"${test}" -> "${PalindromeChecker.longestPalindrome(test)}"`);
  });
  
  console.log('\nAll Palindromes in String:');
  const allPalinTests = ['abccba', 'raceacar'];
  allPalinTests.forEach(test => {
    console.log(`"${test}" -> [${PalindromeChecker.findAllPalindromes(test).join(', ')}]`);
  });
  
  console.log('\nRandom Palindromes:');
  for (let i = 3; i <= 8; i++) {
    console.log(`Length ${i}: ${PalindromeUtils.generateRandomPalindrome(i)}`);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PalindromeChecker, PalindromeUtils, runPalindromeTests };
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runPalindromeTests();
}