

<template>
    <input
      class="validInputs"
      type="file"
      :multiple="IsMultible"
      ref="deleteVal"
      :name="name"
      :accept="acceptedFiles"
      @change="handleFileChange" />
    <div v-if="uploadedImages.length > 0">
      <div
        class="uploaded-block"
        v-for="(image, index) in uploadedImages"
        :key="index"
      >
        <img
          v-if="acceptedFiles == 'image/*'"
          :src="image.url"
          alt="Uploaded Image"
          class="test"
        />
        <div v-else-if="acceptedFiles == 'application/*'">
          <p>{{ image.file.name }}</p>
          pdf text
        </div>
        <button class="remove-btn" @click="removeImage(index)">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
</template>

<script>

export default {

    props: ['acceptedFiles', 'name', 'IsMultible', "customProp", "newImages"],
  data() {
    return {
      uploadedImages: [],
    //   acceptedFiles: "application/*",
    };
  },

  methods: {
    handleFileChange(event) {
      let selectedFiles = event.target.files;

        if (this.validateImageSize(selectedFiles)) {

        if(this.customProp) {
          
          for (let i = 0; i < selectedFiles.length; i++) {
              const file = selectedFiles[i];
                const imageUrl = URL.createObjectURL(file);
                this.uploadedImages.push({ url: imageUrl, file });
            }
            console.log("multible")
            
        }

       else {
          const file = selectedFiles[0];
          const imageUrl = URL.createObjectURL(file);
          this.uploadedImages.push({ url: imageUrl, file, id: 0 });
          
      }
            } else {
              // Display an error message or take appropriate action
              console.log('Image size exceeds the maximum limit');
            }

        // Emit a custom event to pass the uploadedImages array to the parent component
        this.$emit("uploaded-images-updated", this.uploadedImages[0].file);
        console.log(this.uploadedImages)
        // event.target.value = null;
    },

    validateImageSize(files) {
      const maxSizeInBytes = 20 * 1024 * 1024; // 20MB

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSizeInBytes) {
          return false; // Image size exceeds the maximum limit
        }
      }

  return true; // All images are within the size limit
},
    
    removeImage(index) {
      // Remove the image from the uploadedImages array
      this.$emit("remove-image", this.uploadedImages[index]);
      this.uploadedImages.splice(index, 1);
      this.$emit("uploaded-images-updated", this.uploadedImages);
      console.log(this.uploadedImages, "from remove")
      this.$refs.deleteVal.value = null;
    },
  },
  

    watch: {
    newImages(newVal) {
      if (newVal) {
        this.uploadedImages = [{ url: newVal, file: null }];
      }
    },
  },
  
};

</script>

<style lang="scss">
  .input_auth {
      width: 130px;
      height: 130px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      position: relative;
      input[type="file"] {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        overflow: hidden;
        cursor: pointer;
      }
      .uploaded-block {
        position: absolute;
        margin: 0;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
  }
</style>