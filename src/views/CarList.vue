<template>
  <section class="page page-layout">
    <div class="list-car">
      <ul>
        <li>
          <label class="label-checkbox">
            <input type="checkbox" name="checkbox">
            <div class="item-media">
              <i class="icon icon-form-checkbox"></i>
              <img
                src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg"
                width="114"
                height="58"
              >
            </div>
            <div class="item-inner">
              <div class="item-title">指导价：55.98万</div>
              <div class="item-subtitle">指导价：55.98万</div>
            </div>
          </label>
        </li>
      </ul>
    </div>
  </section>
</template>
<style scoped lang="less">
.page-layout {
  //   background: red;
}
.list-car {
  background: #fff;
  margin-top: 20px;
}
.label-checkbox {
  input {
    display: none;
  }
  display: flex;
  padding-top: 0.6rem;
  flex-direction: row;
  .item-media {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 0.6rem;
  }
}
.item-inner {
  margin-left: 0.35rem;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 0.6rem;
  flex: 1;
}
label.label-checkbox i.icon-form-checkbox {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.6rem;
  background: #dddddd;
  margin-right: 0.25rem;
  margin-left: 0.3rem;
}
label.label-checkbox
  input[type="checkbox"]:checked
  + .item-media
  i.icon-form-checkbox {
  background: #e50113;
}
</style>