|             |                            |             |             |             |             |             |             |             |             |             |             |
|-------------|----------------------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-------------|
|Condition    |                            |             |             |             |             |             |             |             |             |             |             |
|             |Initial input is "0"        |Y            |Y            |             |             |             |             |             |             |Y            |Y            |
|             |Initial input is "1"        |             |             |Y            |Y            |             |             |             |             |             |             |
|             |Initial input is "254"      |             |             |             |             |Y            |Y            |             |             |             |             |
|             |Initial input is "255"      |             |             |             |             |             |             |Y            |Y            |             |             |
|Action       |                            |             |             |             |             |             |             |             |             |             |             |
|             |Click "+"                   |Y            |             |Y            |             |Y            |             |Y            |             |             |             |
|             |Click "-"                   |             |Y            |             |Y            |             |Y            |             |Y            |             |             |
|             |Modify Initial input to "AB"|             |             |             |             |             |             |             |             |Y            |             |
|             |Modify Initial input to "1%"|             |             |             |             |             |             |             |             |             |Y            |
|Result       |                            |             |             |             |             |             |             |             |             |             |             |
|             |Input                       |1            |0            |2            |1            |255          |253          |255          |254          |0            |0            |
|             |Error Message               |N/A          |N/A          |N/A          |N/A          |N/A          |N/A          |N/A          |N/A          |Invalid Input|Invalid Input|
