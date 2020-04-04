$resourceGroupName = "Ignition"
$serverName = "ignition"
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$ruleName = $currentUser.split("\")[1]
$ip = Invoke-RestMethod http://ipinfo.io/json | Select -exp ip

Connect-AzAccount

Set-AzSqlServerFirewallRule -ResourceGroupName $resourceGroupName `
    -ServerName $serverName `
    -FirewallRuleName $ruleName -StartIpAddress $ip -EndIpAddress $ip