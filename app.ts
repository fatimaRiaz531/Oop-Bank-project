#! /usr/bin/env node 

import inquirer from 'inquirer';
import NumberPrompt from 'inquirer/lib/prompts/number.js';

//  bank account interface
 

console.log("^".repeat(60));
console.log("\n\tWelcome to code with fatima\n");
console.log("^".repeat(60));


interface  BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount : number): void
    checkBalance(): void
}

//  bank account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber =accountNumber
        this.balance= balance
    }
//  debit money
withdraw(amount: number): void {
    if (this.balance >= amount) {
        this.balance -= amount;
        console.log(`Withdraw1 of $${amount} successful. Remaining balance: $${this.balance}`);   
    }else {
        console.log("Insufficient balance.")
    }
}
//  credit money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1;             // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
}

//  check balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
}
}
//  customers class
class Customers{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string,lastName: string,gender: string,age: number,mobileNumber: number,account: BankAccount) 
    {
        this.firstName = firstName;
        this.lastName= lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account= account

    }

}
//  create bank  accounts

const accounts: BankAccount[]  =[
    new BankAccount(1001, 5000),
    new BankAccount(1002, 9000),
    new BankAccount(1003, 15000)
];

//  create customers

const customers: Customers[] = [
    new Customers ("Ahmed","khan", "Male", 30, 3460388324, accounts[2]),
    new Customers ("Ayesha","Ahmed", "Female", 19, 3360388324, accounts[1]),
    new Customers("Zohan","khan", "Male", 26, 3160388324, accounts[0]),
]

//  function to interact with bank account

async function service() {
    do{
        const accountNumberInput =await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })
        const customer = customers.find (customer => customer.account.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an operation",
                choices :["Deposit", "Withdraw" , "Check balance", "Exit"]
            });

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name : "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;

                case "Withdraw":
                    const withdraw = await inquirer.prompt({
                        name : "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.withdraw(withdraw.amount)
                    break;

                case "Check balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("Exiting bank program....");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
                    
            }
         }else {
            console.log("Invalid account number . Please try again with correct account number.");
         }

    }while (true)    
}
service();




