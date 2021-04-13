/**************************************************************************************************/
/**
 * Given a string s, return the longest palindromic substring in s.
 *
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function(s) {

    const len = s.length;
    const dp = [];
    let lsp = '';

    for (let i = 0; i < len; i += 1) {
        dp[i] = [];
        for (let j = 0; j < len; j += 1) {
            dp[i][j] = false;
        }
    }

    for (let l = 0; l < len; l += 1) {
        for (let i = 0; i + l < len; i += 1) {
            let j = i + l;
            if (l == 0) {
                dp[i][j] = true;
            } else if (l == 1) {
                dp[i][j] = s[i] === s[j];
            } else {
                dp[i][j] = dp[i+1][j-1] && (s[i] === s[j]);
            }
            if (dp[i][j] && l + 1 > lsp.length) {
                lsp = s.substring(i, i + l + 1);
            }
        }
    }
    return lsp;

    /* timeout
    let lsp = '';
    const len = s.length;
    if (len <= 1) {
        return s;
    }
    let left = -1;
    let right = -1;
    if (len % 2 === 0) {
        left = len / 2 - 1;
        right = len / 2;
    } else {
        left = Math.floor(len / 2) - 1;
        right = Math.floor(len / 2) + 1;
    }
    while (left >= 0) {
        if (s[left] === s[right]) {
            left -= 1;
            right += 1;
        } else {
            const leftLsp = longestPalindrome(s.substring(0, len - 1));
            const rightLsp = longestPalindrome(s.substring(1, len));
            return leftLsp.length > rightLsp.length ? leftLsp : rightLsp;
        }
    }
    return s; */
};
/**************************************************************************************************/
/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {
    const nums = [...nums1, ...nums2].sort((a,b) => a-b);
    const len = nums.length;
    const mod = len % 2; 
    if (mod % 2 === 0) {
        return ((nums[len/2-1] || 0) + (nums[len/2] || 0)) / 2;
    }
    return nums[(len-1)/2];
}
/**************************************************************************************************/
/**
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
    const result = {
        0: ""
    };
    let flag = 0;
    for (let i = flag; i < s.length;) {
        if (result[i-flag].includes(s[i])) {
            flag += 1;
            i = flag + 1;
            result[1] = s[flag];
        } else {
            result[i-flag+1] = s.substring(flag, i+1);
             i += 1;
        }
    }
    const idx = Object.keys(result).sort((a, b) => +b - +a)[0];
    return result[idx];
}
/**************************************************************************************************/
/**
 * You are given two non-empty linked lists representing two non-negative integers.
 * The digits are stored in reverse order, and each of their nodes contains a single digit.
 * Add the two numbers and return the sum as a linked list.
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
    const map = [0]; // 每数位因进位所增加的值大小
    const len1 = l1.length;
    const len2 = l2.length;
    const len = len1 >= len2 ? len1 : len2;
    let result = [];
    for (let i = 0; i < len; i += 1) {
        const tmp = (l1[len1-1-i] || 0) + (l2[len2-1-i] || 0);
        map[i+1] = tmp < 10 ? 0 : 1; // 
        result[i] = tmp < 10 ? tmp : tmp - 10; 
    }
    for (let i = 0; i < len; i += 1) {
        result[i] = result[i] + map[i];
        if (result[i] >= 10) {
            map[i+1] += 1;
        }
    }
    if (map[len] > 0) {
        result[len] = map[len];
    }
    result = result.reverse();
    return new ListNode(result, result.length-1);
};
function ListNode(list, len) {
    return {
        val: list[len],
        next: len > 0 ? new ListNode(list, len-1) : null,
    }
 }
/**************************************************************************************************/
/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    // solution three, referring to other's answer, similar with solution two
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const num1 = nums[i];
        const num2 = target - nums[i];
        if (map.has(num2)) {
            return [map.get(num2), i];
        } else {
            map.set(num1,i);
        }
    }
    // solution two, referring to other's answer
    /*const tmpMap = {};
    for (let i = 0; i < nums.length; i++) {
        if (Object.keys(tmpMap).includes(''+nums[i])) {
            return [i, +tmpMap[nums[i]]];
        }
        tmpMap[target - nums[i]] = i;
    }*/
    // solution two, if nums contains negative num, wrong  
    /*tmpNums = [...nums].sort();
    const len = nums.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; tmpNums[j] <= target; j++) {
            if (tmpNums[i] + tmpNums[j] === target) {
                const result = [];
                for (let k = 0; k < len, result.length != 2; k++) {
                    if (nums[k] === tmpNums[i] || nums[k] === tmpNums[j]) {
                        result.push(k);
                    }
                }
                return result;
            }
        }
    }*/
    // solution one
    /*const len = nums.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }*/
};
