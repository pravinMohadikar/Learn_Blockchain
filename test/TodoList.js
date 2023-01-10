const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TodoList', function () {
  it('Should create task', async function () {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    expect(await todoList.todoTotalCount()).to.equal(0);

    todoList.create('Morning walk');
    todoList.create('Eat food');
    todoList.create('Sleep at night');

    expect(await todoList.todoTotalCount()).to.equal(3);
  });

  it('Should mark a task complete', async function () {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    expect(await todoList.todoTotalCount()).to.equal(0);

    todoList.create('Morning walk');
    todoList.create('Eat food');
    todoList.create('Sleep at night');

    expect(await todoList.get(0)).to.equal('Morning walk', PENDING);
    expect(await todoList.get(1)).to.equal('Eat food', COMPLETE);
    expect(await todoList.get(2)).to.equal('Sleep at night', PENDING);

    await todoList.toggleCompleted(1);

    expect(await todoList.get(0)).to.equal('Morning walk', PENDING);
    expect(await todoList.get(1)).to.equal('Eat food', COMPLETE);
    expect(await todoList.get(2)).to.equal('Sleep at night', PENDING);
  });

  it('Should get a task at Index', async function () {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    expect(await todoList.totalCount()).to.equal(0);

    todoList.create('learn solidity');
    todoList.create('learn vyper');
    todoList.create('learn blockchain');

    expect(await todoList.get(0)).to.equal('learn solidity', PENDING);
    expect(await todoList.get(1)).to.equal('learn vyper', PENDING);
    expect(await todoList.get(2)).to.equal('learn blockchain', PENDING);
  });


  it('Should get a task and its status', async function () {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    expect(await todoList.totalCount()).to.equal(0);

    todoList.create('learn solidity');

    expect(await todoList.get(0)).to.equal('learn solidity', PENDING);
  });

  it('Should remove a task at index', async function () {
    const TodoList = await ethers.getContractFactory('TodoList');
    const todoList = await TodoList.deploy();
    await todoList.deployed();

    expect(await todoList.todoTotalCount()).to.equal(0);

    todoList.create('learn solidity');

    expect(await todoList.todoTotalCount()).to.equal(1);

    todoList.create('learn vyper');

    expect(await todoList.totalCount()).to.equal(2);

    todoList.removeTask(0);

    expect(await todoList.get(0)).to.equal('learn vyper', PENDING);
  });
});