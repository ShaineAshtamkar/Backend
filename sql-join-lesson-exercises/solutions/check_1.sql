USE sql_intro;




SELECT item_purchased,amount ,name,industry
FROM transaction,company
WHERE transaction.company_id=company.id
