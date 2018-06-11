Main = {
    init: function(){
        $("#mmenu").mmenu({
            searchfield: {
                add: true
            }
        }, {
            offCanvas: {
                pageSelector: "#page_wrapper"
            }
        });
        
        var _API = $("#mmenu").data("mmenu");
        $("html").on("click", ".open_menu_mobile", function(){
            if($(this).hasClass("open"))
                _API.close();
            else
                _API.open();
            
            $(this).toggleClass("open");
        });
        
        
        $("#bestSellers .products_list").slick({
            slidesToScroll: 4,
            slidesToShow: 4,
            
            prevArrow: "<div class=\"bestSellers_arrow prev_arrow\"><img src=\"assets/img/arrow_left.svg\"></div>",
            nextArrow: "<div class=\"bestSellers_arrow next_arrow\"><img src=\"assets/img/arrow_right.svg\"></div>",
            
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToScroll: 3,
                    slidesToShow: 3
                }
            }]
        });
        
        $(".fullBanner_slider").slick({
            prevArrow: "<div class=\"fullBanner_arrow prev_arrow\"><img src=\"assets/img/arrow_left.svg\"></div>",
            nextArrow: "<div class=\"fullBanner_arrow next_arrow\"><img src=\"assets/img/arrow_right.svg\"></div>"
        });
        
        
        $("html").on("click", ".product_quantity .product_add", function(){
            var _this = $(this);
            Main.addRemoveProductCart(_this, "add");
        });
        
        $("html").on("click", ".product_quantity .product_remove", function(){
            var _this = $(this);
            Main.addRemoveProductCart(_this, "remove");
        });
        
        $("html").on("click", ".product_actions .product_delete", function(){
            $(this).closest(".product_item").remove();
        });
    },
    
    addRemoveProductCart: function(_this, _method){
        var _item = _this.closest(".product_item");
        var _total = _item.find(".product_quantity .product_total");
        var _val = parseInt(_total.val());
        var _price = parseFloat(_item.data("price").replace(",", "."));
        
        if(_method === "add")
            _val++;
        else if(_method === "remove" && _val > 1)
            _val--;

        _price *= _val;
        _total.val(_val);
        
        var _priceString = "R$ " + _price.toFixed(2).replace(".", ",");
        var _cartValues = _this.closest(".cart_body").find(".cart_values");
        
        _item.find(".product_numeric .product_price").text(_priceString);
        _cartValues.find(".cart_subtotal span").text(_priceString);
        _cartValues.find(".cart_total span").text(_priceString);
    }
}

$(Main.init);