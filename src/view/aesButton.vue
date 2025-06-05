<template>
  <div>
    <!-- <el-button @click="handleEncrypt">AES加密</el-button> -->
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  mounted() {
    this.handleEncrypt()
  },
  methods: {
    handleEncrypt() {
      const originalData = `PMS-PU-${Date.now()}`;
      const key = CryptoJS.enc.Utf8.parse("FdNJLjnh83L3hhuh");

      // 加密
      const encrypted = CryptoJS.AES.encrypt(originalData, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const base64Token = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(encrypted)
      );
      window.location.href = `https://dls.4dlp.com.cn:7102/bim/#/?token=${base64Token}`

      // console.log("加密结果:", base64Token);
      // 解密
      // const base64 = CryptoJS.enc.Utf8.stringify(
      //   CryptoJS.enc.Base64.parse(base64Token)
      // );
      // const decrypted = CryptoJS.AES.decrypt(base64, key, {
      //   mode: CryptoJS.mode.ECB,
      //   padding: CryptoJS.pad.Pkcs7,
      // });

      // try {
      //   const parsedData = JSON.parse(decrypted);
      //   console.log("解析后的对象:", parsedData);
      // } catch (e) {
      //   console.log("解密后的字符串:", decrypted);
      // }
    },
  },
};
</script>

<style>
</style>