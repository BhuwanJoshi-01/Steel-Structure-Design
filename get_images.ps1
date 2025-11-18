$outputDir = "projects"
$count = 0
foreach ($i in 1..30) {
    $count++
    $filename = "project{0:D2}.jpg" -f $count
    $outputPath = Join-Path $outputDir $filename
    $url = "https://picsum.photos/seed/steel$i/800/600"
    Write-Host "[$count/30] $filename"
    Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing
    Start-Sleep -Milliseconds 200
}
Write-Host "Done!"

