with open('www/index.html', 'r+') as f:
    content = f.read()
    f.seek(0)
    f.truncate()
    f.write(content.replace('<p class="center"><strong>placeholder</strong></p></section>', '</section><section class="row-fluid clearfix hidden-xs hidden-sm"><div class="center"><div class="btn-group btn-group-justified"><a href="#" data-filter="all" class="btn btn-info">All Mapping Documents</a><a href="#" data-filter="application-profile" class="btn btn-default">Application Profiles</a><a href="#" data-filter="mapping" class="btn btn-default">Mappings</a><a href="#" data-filter="code" class="btn btn-default">Code</a><a href="#" data-filter="best-practice" class="btn btn-default">Best Practices</a></div></div></section><br>'))
