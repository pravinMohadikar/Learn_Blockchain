// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Insert, update, read from array of structs 
contract TodoList is ReentrancyGuard, Ownable {
    enum TodoStatus {
        PENDING,
        COMPLETE
    }
    // Todo structure
    struct Todo {
        string text;
        TodoStatus status;
    }

    TodoStatus private constant _DEFAULT_CHOICE = TodoStatus.PENDING;

    Todo[] public todos;

    function create(string calldata _text)  external onlyOwner nonReentrant {
        todos.push(Todo({
            text: _text,
            status:TodoStatus.PENDING 
        }));
    }

    function updateText(uint _index, string calldata _text) external onlyOwner nonReentrant {
        todos[_index].text = _text;
    }

    function get(uint _index) external view returns (string memory, TodoStatus) {
        Todo memory todo = todos[_index];
        return (todo.text, todo.status);
    }

    function toggleCompleted(uint _index) external onlyOwner nonReentrant {
        todos[_index].status = TodoStatus.COMPLETE;
    }

    function todoTotalCount() external view onlyOwner returns (uint) {
        return todos.length;
    }

    function deleteTodo(uint _index) public onlyOwner nonReentrant {
        require(_index <= todos.length, "Todo Task length are less");
        todos[_index] = todos[todos.length - 1];
        todos.pop();
    }

    function totalTodoCount() public view returns (uint) {
        return todos.length;
    }


}
