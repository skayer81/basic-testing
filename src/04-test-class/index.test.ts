import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const testValue = 666;
    const bankAccount = getBankAccount(testValue);
    expect(bankAccount.getBalance()).toBe(testValue);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testValue = 666;
    const amount = 999;
    const bankAccount = getBankAccount(testValue);
    expect(() => {
      bankAccount.withdraw(amount);
    }).toThrowError(new InsufficientFundsError(testValue));
  });

  test('should throw error when transferring more than balance', () => {
    const testValue = 666;
    const otherTestValue = 777;
    const amount = 999;
    const bankAccount = getBankAccount(testValue);
    const otherBankAccount = getBankAccount(otherTestValue);
    expect(() => {
      bankAccount.transfer(amount, otherBankAccount);
    }).toThrowError(new InsufficientFundsError(testValue));
  });

  test('should throw error when transferring to the same account', () => {
    const testValue = 666;
    const amount = 300;
    const bankAccount = getBankAccount(testValue);
    expect(() => {
      bankAccount.transfer(amount, bankAccount);
    }).toThrowError(new TransferFailedError());
  });

  test('should deposit money', () => {
    const testValue = 666;
    const amount = 300;
    const bankAccount = getBankAccount(testValue);
    expect(bankAccount.deposit(amount).getBalance()).toBe(testValue + amount);
    expect(bankAccount.deposit(amount).getBalance()).toBe(
      testValue + 2 * amount,
    );
  });

  test('should withdraw money', () => {
    const testValue = 666;
    const amount = 300;
    const bankAccount = getBankAccount(testValue);
    expect(bankAccount.withdraw(amount).getBalance()).toBe(testValue - amount);
    expect(bankAccount.withdraw(amount).getBalance()).toBe(
      testValue - 2 * amount,
    );
  });

  test('should transfer money', () => {
    const testValue = 666;
    const otherTestValue = 777;
    const amount = 300;
    const bankAccount = getBankAccount(testValue);
    const otherBankAccount = getBankAccount(otherTestValue);
    bankAccount.transfer(amount, otherBankAccount);
    expect(bankAccount.getBalance()).toBe(testValue - amount);
    expect(otherBankAccount.getBalance()).toBe(otherTestValue + amount);
    bankAccount.transfer(amount, otherBankAccount);
    expect(bankAccount.getBalance()).toBe(testValue - 2 * amount);
    expect(otherBankAccount.getBalance()).toBe(otherTestValue + 2 * amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockRandom = jest.spyOn(lodash, 'random');
    const bankAccount = getBankAccount(0);
    mockRandom.mockImplementation(() => 50);
    expect(await bankAccount.fetchBalance()).toBe(50);
    mockRandom.mockImplementation(() => 70);
    expect(await bankAccount.fetchBalance()).toBe(70);
    mockRandom.mockImplementation(() => 0);
    expect(await bankAccount.fetchBalance()).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockRandom = jest.spyOn(lodash, 'random');
    const newBalance = 69;
    const newBalance2 = 96;
    const requestFailed = 1;
    const bankAccount = getBankAccount(0);
    mockRandom.mockImplementationOnce(() => newBalance);
    mockRandom.mockImplementationOnce(() => requestFailed);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
    expect(mockRandom.mock.calls.length).toBe(2);
    mockRandom.mockImplementationOnce(() => newBalance2);
    mockRandom.mockImplementationOnce(() => requestFailed);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance2);
    expect(mockRandom.mock.calls.length).toBe(4);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockRandom = jest.spyOn(lodash, 'random');
    const newBalance = 69;
    const requestFailed = 0;
    const bankAccount = getBankAccount(0);
    mockRandom.mockImplementationOnce(() => newBalance);
    mockRandom.mockImplementationOnce(() => requestFailed);
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
