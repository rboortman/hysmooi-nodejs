(function ($, window, undefined) {
   $(document).ready(function() {
      var browserName, error, fullVersion, i, ix, len, majorVersion, nAgt, nVer, nameOffset, row, rows, table, txt, verOffset, version;
      try {
         nVer = window.navigator.appVersion;
         nAgt = window.navigator.userAgent;
         browserName = window.navigator.appName;
         fullVersion = '' + parseFloat(window.navigator.appVersion);
         majorVersion = parseInt(window.navigator.appVersion, 10);
         if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
            browserName = 'Opera';
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
               fullVersion = nAgt.substring(verOffset + 8);
            }
         } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
            browserName = 'Internet Explorer';
            fullVersion = nAgt.substring(verOffset + 5);
         } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
         } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) !== -1) {
               fullVersion = nAgt.substring(verOffset + 8);
            }
         } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
         } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() === browserName.toUpperCase()) {
               browserName = window.navigator.appName;
            }
         }
         if ((ix = fullVersion.indexOf(';')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
         }
         if ((ix = fullVersion.indexOf(' ')) !== -1) {
            fullVersion = fullVersion.substring(0, ix);
         }
         majorVersion = parseInt('' + fullVersion, 10);
         if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(window.navigator.appVersion);
            majorVersion = parseInt(window.navigator.appVersion, 10);
         }
         txt = '<p>U gebruikt nu de volgende browser:</br></br><span id="browser_name">' + browserName + ', versie ' + majorVersion + '</span></br><span id="browser_announcement">Deze wordt';
         table = document.getElementById('browsers');
         rows = table.getElementsByTagName('tr');
         for (i = 0, len = rows.length; i < len; i++) {
            row = rows[i];
            if (row.firstElementChild.innerText === browserName) {
               version = row.lastElementChild.innerText;
            }
         }
         if (version <= majorVersion) {
            txt += ' dus ondersteund!</span></p>';
         } else {
            txt += ' helaas dus NIET ondersteund!</span></p>';
         }
         document.getElementById('browser_version').innerHTML = txt;
      } catch (_error) {
         error = _error;
         console.log('' + error);
      }
   });
})(window.jQuery, window);