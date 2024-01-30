Feature: Create New Payment
    As a user
    I want to create a new payment
    So that I can make a payment for my order

  Scenario: Successful payment creation
    Given I provide a orderId "test123" and an amount 50
    When I submit a new payment order
    Then I should receive my payment details with status pending
