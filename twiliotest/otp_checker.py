curl 'https://verify.twilio.com/v2/Services/VA5ad2cce881f5f29a00b9683913dcdbb2/Verifications' \
-X POST \
--data-urlencode 'To=+251986064500' \
--data-urlencode 'Channel=sms' \
-u 'ACad91b82ae8a1a8de3957958635a3be70:2978199df6f773719806bf552ca8e420'


curl 'https://verify.twilio.com/v2/Services/VA5ad2cce881f5f29a00b9683913dcdbb2/VerificationCheck' \
-X POST \
--data-urlencode 'To=+251986064500' \
--data-urlencode 'Code=652778' \
-u 'ACad91b82ae8a1a8de3957958635a3be70:2978199df6f773719806bf552ca8e420'


