---
title: "Export all data from a MySQL/MariaDB database to CSV files"
date: 2023-08-09T12:50:01+05:30
draft: false
tags: [ "MySQL", "MariaDB", "Database" ]
---
Bash script to export all data from a MySQL/MariaDB database to CSV files:

```bash
#!/bin/bash

DB_USER="your_username"
DB_PASS="your_password"
DB_NAME="your_database"

TABLES=$(mysql -u$DB_USER -p$DB_PASS -e "USE $DB_NAME; SHOW TABLES;" | grep -v "Tables_in")

for TABLE in $TABLES; do
    mysql -u$DB_USER -p$DB_PASS -e "USE $DB_NAME; SELECT * FROM $TABLE;" | sed 's/\t/","/g;s/^/"/;s/$/"/' > "$TABLE.csv"
done

echo "CSV export complete!"
```

Replace `your_username`, `your_password`, and `your_database` with your actual database credentials and database name. Save the script to a file, make it executable with `chmod +x scriptname.sh`, and then run it using `./scriptname.sh` in your terminal. This script will create a CSV file for each table in your database, containing all the data from that table.