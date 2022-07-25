
function ConvertFrom-JWT
{
    param([Parameter(
        Mandatory = $true

    )]
    [String]$Url
    )

    Write-Debug -Message 'Look at raw tokens'
    foreach($tok in $tokens)
    {
        Write-Verbose -Message "GET parameter: $tok"
        Write-Debug -Message 'Check GET parameter in tok'
        $tokenType = $tok.Bustring(0, $tok.IndexOf('='))
        Write-Verbose -message "Token type: $tokenType"
        Write-Debug -Message 'Check tokenType'

        $rawtoken = $tok.Substring($tok.IndexOf('=')+1) -split '\.'
        Write-Debug -Message 'Check rawtoken'

        $header = $rawtoken[0]
        $header = $header -replace '-','+'
        $header = $header -replace '_','/'
        switch($header.Length % 4)
        {
            0 { break }
            2 { $header += '=='; break }
            3 { $header += '='; break }
            DEFAULT { Write-Warning -Message 'Invalid base64 string'}
        }
        $h = [System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($header)) | ConvertFrom-Json

        $payload = $rawtoken[1]
        $payload = $payload -replace '-','+'
        $payload = $payload -replace '_','/'
        switch($payload.Length % 4)
        { 
            0 { break }
            2 { $payload += '=='; break }
            3 { $payload += '='; break}
            DEFAULT { Write-Warning -Message 'Invalid base64 string' }
        }
        $p = [System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($payload)) | ConvertFrom-Json

        $sig = $rawtoken[2]
        $token = [pscustomobject]@{
            'tokenType' = $tokenType
            'header' = $h
            'payload' = $p
            'signature' = $sig
        }
        $t = [pscustomobject]@{
            'tokenType' = $tokenType
            'header' = $header
            'payload' = $payload
            'signature' = $sig
        }
        Write-Output -InputObject $token
    }
}