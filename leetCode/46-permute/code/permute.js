/**
 * @description 全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  if (!Array.isArray(nums) || nums.length < 2) return [nums];

  const len = nums.length;
  const dist = []; // 结果数组
  const path = []; // 遍历路径
  const used = new Array(len); // 输入数组中，对应索引的数是否被选择

  /**
   * 深度优先遍历
   * @param {number[]} nums 输入数组
   * @param {number} depth 递归的层数，即当前已选择了几个数
   * @param {number[]} path 从根节点到任意节点的路径
   * @param {boolean[]} used 输入数组中，对应索引的数是否被选择
   * @param {number[][]} dist 整个 permute 算法输出的全排列数组
   */
  const dps = (nums, depth, path, used, dist) => {
    // 当递归层数达到输入数组的元素个数时，当前路径下所有数字已选择完毕，终止递归
    if (depth === len) {
      // 注意：整个算法 path 变量存的始终都是数组地址，所以在 push 结果数组时要进行拷贝
      dist.push([...path]);
      return;
    }

    // 循环输入数组，使用未选择的数，继续路径
    for (let i = 0; i < len; i++) {
      if (used[i]) {
        continue;
      }

      used[i] = true; // 将数标记为已选择
      path.push(nums[i]); // 将数记录至路径

      // 继续递归选择
      dps(nums, depth + 1, path, used, dist);

      // 回溯：撤销之前的选择操作
      used[i] = false;
      path.pop();
    }
  }

  dps(nums, 0, [], used, dist);
  return dist;
}

console.log(permute([1, 2, 3]));
// [
//   [ 1, 2, 3 ],
//   [ 1, 3, 2 ],
//   [ 2, 1, 3 ],
//   [ 2, 3, 1 ],
//   [ 3, 1, 2 ],
//   [ 3, 2, 1 ]
// ]
