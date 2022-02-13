[![Node.js CI](https://github.com/freddiefujiwara/dtgwt/actions/workflows/node.js.yml/badge.svg)](https://github.com/freddiefujiwara/dtgwt/actions/workflows/node.js.yml)
# dtgwt
Simple Decision Table to "Given" , "When" and "Then"
# How to use
+ Step 1. Download [sample_dt.xlsx](https://github.com/freddiefujiwara/dtgwt/blob/main/sample_dt.xlsx?raw=true)
+ Step 2. Modify as you like
+ Step 3. Go to [Table to Markdown](https://tabletomarkdown.com/convert-spreadsheet-to-markdown/)
+ Step 4. Copy Step 2 to "Paste Table Here!" (Please don't forget about FIRST LINE)
+ Step 5. Click "Convert M↓"
+ Step 6. Click "Copy"
+ Step 8. Go to [Dtgwt page](https://freddiefujiwara.com/dtgwt/#inputscript)
+ Step 9. Copy Step 6 to the "textarea"
+ Step 10. Click "Scenario output"
+ Step 11. Copy "Output Scenarios" as you like

![ezgif.com-gif-maker.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1817/a434ecca-8843-6e63-069a-99260d772b06.gif)
 
# Background
## Example App
Now, suppose you have a simple app with one form and two buttons.

![ezgif.com-gif-maker.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1817/dafff458-cd1f-4dab-9802-152242474407.gif)


- The number "0" is entered as the initial value.
- When the "+" button is clicked, the number is incremented.
- When the "-" button is clicked, the number is decremented.
- The minimum value of the number is "0".
- The maximum value of the number is 255.
- If a non-numeric character is entered, the message "Invalit value" will be displayed.

## Decision table
You have written the following decision table (or something like it) to test this app.

|          |                              |     |     |     |     |     |     |     |     |               |               |
|--------- | ---------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | ------------- |
|Condition |                              |     |     |     |     |     |     |     |     |               |               |
|          | Initial input is "0"         | Y   | Y   |     |     |     |     |     |     | Y             | Y             |
|          | Initial input is "1"         |     |     | Y   | Y   |     |     |     |     |               |               |
|          | Initial input is "254"       |     |     |     |     | Y   | Y   |     |     |               |               |
|          | Initial input is "255"       |     |     |     |     |     |     | Y   | Y   |               |               |
|Action    |                              |     |     |     |     |     |     |     |     |               |               |
|          | Click "+"                    | Y   |     | Y   |     | Y   |     | Y   |     |               |               |
|          | Click "-"                    |     | Y   |     | Y   |     | Y   |     | Y   |               |               |
|          | Modify Initial input to "AB" |     |     |     |     |     |     |     |     | Y             |               |
|          | Modify Initial input to "1%" |     |     |     |     |     |     |     |     |               | Y             |
|Result    |                              |     |     |     |     |     |     |     |     |               |               |
|          | Input                        | 1   | 0   | 2   | 1   | 255 | 253 | 255 | 254 | 0             | 0             |
|          | Error Message                | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | Invalid Input | Invalid Input |

# Problem happened 
However, your test management tool only accept to import scenario-based format as shown below.
you needs to be converted to the following format

|Scenario No|Test conditions|Step description|Step expected result|
|---|---|---|---|
|1|Given Initial input is "0"|When Click "+"|Then Input:1 and Error Message:N/A|
|2|Given Initial input is "0"|When Click "-"|Then Input:0 and Error Message:N/A|
|3|Given Initial input is "1"|When Click "+"|Then Input:2 and Error Message:N/A|
|4|Given Initial input is "1"|When Click "-"|Then Input:1 and Error Message:N/A|
|5|Given Initial input is "254"|When Click "+"|Then Input:255 and Error Message:N/A|
|6|Given Initial input is "254"|When Click "-"|Then Input:253 and Error Message:N/A|
|7|Given Initial input is "255"|When Click "+"|Then Input:255 and Error Message:N/A|
|8|Given Initial input is "255"|When Click "-"|Then Input:254 and Error Message:N/A|',
|9|Given Initial input is "0"|When Modify Initial input to "AB"|Then Input:0 and Error Message:Invalid Input|
|10|Given Initial input is "0"|When Modify Initial input to "1%"|Then Input:0 and Error Message:Invalid Input|

The only way to do this is to create a new tab in the xlsx containing the decision table and convert it one by one by your hands.

![ezgif.com-gif-maker (1).gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1817/0c908a26-a7ca-1417-8551-0c5639cef28b.gif)

It should make you annoying right?

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1817/e26a0298-2717-8d27-d360-6381b3ab0b7f.png)

# Solution
I have created a simple web application to solve the above problem.

![ezgif.com-gif-maker (2).gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/1817/83740374-2f20-a984-f193-40164c090c3d.gif)

~~The input is also in markdown, which is really not very user-friendly (lol).~~
~~I'll make a tool that converts xlsx to markdown to solve this problem later on.~~
(Solved 2022 Feb 13th have a look [here](#how-to-use))
 
 You can find the [source code](https://github.com/freddiefujiwara/dtgwt) here
The demo application is
[here](https://freddiefujiwara.com/dtgwt/#inputscript)

I made this in about two hours in  mess.
If you notice anything, please give me your pull request for anytime.
 

{% include form.html %}
