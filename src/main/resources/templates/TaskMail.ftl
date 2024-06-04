<html lang="en">
<head>
  <meta charset="UTF-8">
  <style type="text/css">
    table, td, th {
      font-size: 12px;
      font-family: Arial;
      border: 1px solid black;
      border-collapse: collapse;
      text-align: center;
      height: 25px;
    }
    td {
      width: 200px;
    }
    p {
      font-size: 14px;
      font-family: Calibri;
    }
  </style>
  <img src="haiilo.png">
</head>
<body>
<p class="p">
  There are unfinished tasks. You can find them in the list below.
  <br></br>
</p>
<table>
  <TBODY>
  <tr bgcolor="#a9a9a9">
    <td>Task Id</td>
    <td>Task Name</td>
    <td>Due Date</td>
  </tr>
  <#list taskList as _task>
    <tr>
      <td>${_task.id}</td>
      <td>${_task.name}</td>
      <td>${_task.dueDate!}</td>
    </tr>
  </#list>
  </TBODY>
</table>
</body>
</html>
