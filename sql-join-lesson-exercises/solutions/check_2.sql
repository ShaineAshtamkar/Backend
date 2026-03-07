USE sql_intro;


SELECT item_purchased,amount ,
cu.name as cust_name,
co.name as comp_name
FROM transaction as tr,company as co, customer as cu
WHERE tr.company_id=co.id AND 
tr.customer_id=cu.id

