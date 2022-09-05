<template>
     <section class="item-box">
        <div class="locat">{{title}}</div>
          <div class="horn dataHorn">
            <div class="lt bugle"></div>
            <div class="rt bugle"></div>
            <div class="rb bugle"></div>
            <div class="lb bugle"></div>
            <slot></slot>
            <!-- <div id="dataChart" style="height: 230px;width: 100%;"></div> -->
          </div>
      </section>
</template>
<script>
export default {
    props:{
        title:String
    }
}
</script>
<style scoped>
.item-box{
    flex: 1;
    margin-right: 5rem;
    position: relative;
    box-shadow: 0px 0px 25px #14b2f4 inset;
}
.item-box:last-child{
     margin-right:0;
}
.locat {
	position: absolute;
	left: 50%;
	min-width: 10rem;
	padding:0 1rem ;
	height: 3rem;
	line-height: 3rem;
	top: -1.5rem;
	background: #152871;
	color: #00BFFE;
	border: 1px solid #1E8BE4;
	text-align: center;
	z-index: 10;
	margin-left: -5rem;
}

.horn {
	position: relative;
	height: 100%;
	width: 100%;
	border: 1px solid #182A55;
	padding: 0 1rem;
	/*box-shadow: 0px 0px 10px #14b2f4 inset;*/
}

.horn>.bugle {
	width: 1.5rem;
	height: 1.5rem;
	position: absolute;
}

.horn .lt {
	border-top: 3px solid #4B83D8;
	border-left: 3px solid #4B83D8;
	left: -0.2rem;
	top: -0.2rem;
}

.horn .rt {
	border-top: 3px solid #4B83D8;
	border-right: 3px solid #4B83D8;
	right: -0.2rem;
	top: -0.2rem;
}

.horn .rb {
	border-bottom: 3px solid #4B83D8;
	border-right: 3px solid #4B83D8;
	right: -0.2rem;
	bottom: -0.2rem;
}

.horn .lb {
	border-bottom: 3px solid #4B83D8;
	border-left: 3px solid #4B83D8;
	left: -0.2rem;
	bottom: -0.2rem;
}
</style>