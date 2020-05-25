<template>
  <div class="container">
    <div class="block">
      <div class="box" v-for="item in typeList" :key="item.key" @click="toContent(item)">
        <p>{{item.value}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [
        { key: 'clock', value: '时钟', url: '/clock' },
      ],
    };
  },

  methods: {
    toContent({ url }) {
      this.$router.push({ path: url });
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    .block {
      display: flex;
      flex-wrap: wrap;
      $num: 5;
      $space: 20px;
      width: calc(100% + #{$space});
      .box {
        margin: 0 $space $space 0;
        width: calc((100% / #{$num}) - #{$space});
        height: 100px;
        border-radius: 4px;
        @include flex-row(center, center);
        p {
          font-size: $font-size-sm;
          color: $color-font-important;
        }
        box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.1);
        &:hover {
          border: 1px solid $color-border2;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: $screen-sm-max) {
    .container {
      padding: 10px;
      .block {
        $num: 2;
        $space: 10px;
        width: calc(100% + #{$space});
        .box {
          margin: 0 $space $space 0;
          width: calc((100% / #{$num}) - #{$space});
        }
      }
    }
  }
</style>
