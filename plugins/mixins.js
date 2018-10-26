// https://cn.vuejs.org/v2/guide/mixins.html
import Vue from 'vue'

export default () => {
  Vue.mixin({
    mounted() {
      if (!window.myDrag) this.disableDragEvent()
    },
    methods: {
      disableDragEvent() {
        console.log('lallalalla')
        window.myDrag = true
        window.addEventListener('dragenter', this.disableDrag, false)
        window.addEventListener('dragover', this.disableDrag)
        window.addEventListener('drop', this.disableDrag)
      },
      disableDrag(e) {
        const dropzone = document.getElementById('upload-area') // 这个是可拖拽的上传区
        if (dropzone === null || !dropzone.contains(e.target)) {
          e.preventDefault()
          e.dataTransfer.effectAllowed = 'none'
          e.dataTransfer.dropEffect = 'none'
        }
      }
    }
    // beforeDestroy() {
    //   if (window.myDrag) {
    //     console.log('before...DDDD')
    //     window.removeEventListener('dragenter', this.disableDrag, false)
    //     window.removeEventListener('dragover', this.disableDrag)
    //     window.removeEventListener('drop', this.disableDrag)
    //   }
    // }
  })
}
