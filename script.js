function minCostToConnectRopes(ropes) {
  if (ropes.length < 2) return 0;

  const minHeap = [];
  let totalCost = 0;

  // Create a min-heap
  for (let i = 0; i < ropes.length; i++) {
    minHeap.push(ropes[i]);
  }

  // Build the heap
  buildMinHeap(minHeap);

  while (minHeap.length > 1) {
    const rope1 = extractMin(minHeap);
    const rope2 = extractMin(minHeap);

    const newRope = rope1 + rope2;
    totalCost += newRope;

    insert(minHeap, newRope);
  }

  return totalCost;
}

function buildMinHeap(arr) {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, i);
  }
}

function extractMin(arr) {
  if (arr.length === 1) {
    return arr.pop();
  }

  const root = arr[0];
  arr[0] = arr.pop();
  heapify(arr, 0);
  return root;
}

function insert(arr, value) {
  arr.push(value);
  let current = arr.length - 1;
  while (current > 0 && arr[current] < arr[Math.floor((current - 1) / 2)]) {
    [arr[current], arr[Math.floor((current - 1) / 2)]] = [arr[Math.floor((current - 1) / 2)], arr[current]];
    current = Math.floor((current - 1) / 2);
  }
}

function heapify(arr, index) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  let smallest = index;

  if (left < arr.length && arr[left] < arr[smallest]) {
    smallest = left;
  }

  if (right < arr.length && arr[right] < arr[smallest]) {
    smallest = right;
  }

  if (smallest !== index) {
    [arr[index], arr[smallest]] = [arr[smallest], arr[index]];
    heapify(arr, smallest);
  }
}

const ropeForm = document.getElementById('ropeForm');
const ropeInput = document.getElementById('ropeInput');
const result = document.getElementById('result');

ropeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = ropeInput.value;
  const ropes = input.split(',').map(Number);
  const minCost = minCostToConnectRopes(ropes);
  result.textContent = `Minimum cost to connect ropes: ${minCost}`;
});
