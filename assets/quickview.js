function quickView() {
    $(".quick-view").click(function () {
        0 == $("#quick-view").length && $("body").append('<div id="quick-view"></div>');
        var t = $(this).data("handle");
        $("#quick-view").addClass(t),
            jQuery.getJSON("/products/" + t + ".js", function (e) {
                var i = e.title;
                var o = e.type;
                var a = 0;
                var n = 0;
                var c = e.description;
                var r = e.images;
                var s = e.variants;
                var d = e.options;
                var p = "/products/" + t;
                $(".qv-product-title").text(i), $(".qv-product-type").text(o), $(".qv-product-description").html(c), $(".view-product").attr("href", p);
                var v = $(r).length;
                $(r).each(function (t, e) {
                    if (t == v - 1) {
                        var i = '<div><img class="lazy2" data-src="' + e + '"></div>';
                        (i = i.replace(".jpg", "_800x.jpg").replace(".png", "_800x.png")), $(".qv-product-images").append(i), $(".qv-product-images").slick({ dots: !1, arrows: !1, respondTo: "min", useTransform: !1 }).css("opacity", "1");
                    } else (i = (i = '<div><img class="lazy2" data-src="' + e + '"></div>').replace(".jpg", "_800x.jpg").replace(".png", "_800x.png")), $(".qv-product-images").append(i);
                }),
                    $(d).each(function (t, e) {
                        var i = e.name;
                        var o = ".option." + i.toLowerCase();
                        $(".qv-product-options").append('<div class="option-selection-' + i.toLowerCase() + '"><span class="option">' + i + '</span><select class="option-' + t + " option " + i.toLowerCase() + '"></select></div>'),
                            $(e.values).each(function (t, e) {
                                $(".option." + i.toLowerCase()).append('<option value="' + e + '">' + e + "</option>");
                            });
                    }),
                    $(e.variants).each(function (t, e) {
                        return 0 == e.inventory_quantity
                            ? ($(".qv-add-button").prop("disabled", !0).val("Sold Out"), $(".qv-add-to-cart").hide(), $(".qv-product-price").text("Sold Out").show(), !0)
                            : ((a = parseFloat(e.price / 100).toFixed(2)),
                              (n = parseFloat(e.compare_at_price / 100).toFixed(2)),
                              $(".qv-product-price").text("$" + a),
                              n > 0
                                  ? $(".qv-product-original-price")
                                        .text("$" + n)
                                        .show()
                                  : $(".qv-product-original-price").hide(),
                              $("select.option-0").val(e.option1),
                              $("select.option-1").val(e.option2),
                              $("select.option-2").val(e.option3),
                              !1);
                    });
            }),
            $(document).on("change", "#quick-view select", function () {
                var e = "";
                $("#quick-view select").each(function (t) {
                    e = "" == e ? $(this).val() : e + " / " + $(this).val();
                }),
                    jQuery.getJSON("/products/" + t + ".js", function (t) {
                        $(t.variants).each(function (t, i) {
                            if (i.title == e) {
                                var o = parseFloat(i.price / 100).toFixed(2);
                                var a = parseFloat(i.compare_at_price / 100).toFixed(2);
                                var n = i.inventory_quantity;
                                var c = i.inventory_management;
                                $(".qv-product-price").text("$" + o),
                                    $(".qv-product-original-price").text("$" + a),
                                    null == c
                                        ? $(".qv-add-button").prop("disabled", !1).val("Add to Cart")
                                        : i.inventory_quantity < 1
                                        ? $(".qv-add-button").prop("disabled", !0).val("Sold Out")
                                        : $(".qv-add-button").prop("disabled", !1).val("Add to Cart");
                            }
                        });
                    });
            }),
            $.fancybox({
                href: "#quick-view",
                maxWidth: 1040,
                maxHeight: 600,
                fitToView: !0,
                width: "75%",
                height: "70%",
                autoSize: !1,
                closeClick: !1,
                openEffect: "none",
                closeEffect: "none",
                beforeLoad: function () {
                    var t = $("#quick-view").attr("class");
                    $(document).on("click", ".qv-add-button", function () {
                        var e = $(".qv-quantity").val();
                        var i = "";
                        var o = "";
                        function a() {
                            jQuery
                                .post("/cart/add.js", { quantity: e, id: o }, null, "json")
                                .done(function () {
                                    $(".qv-add-to-cart-response")
                                        .addClass("success")
                                        .html("<span>" + $(".qv-product-title").text() + ' has been added to your cart. <a href="/cart">Click here to view your cart.</a>');
                                })
                                .fail(function (t) {
                                    var e = t.responseJSON;
                                    $(".qv-add-to-cart-response")
                                        .addClass("error")
                                        .html("<span><b>ERROR: </b>" + e.description);
                                });
                        }
                        $("#quick-view select").each(function (t) {
                            i = "" == i ? $(this).val() : i + " / " + $(this).val();
                        }),
                            jQuery.getJSON("/products/" + t + ".js", function (t) {
                                $(t.variants).each(function (t, e) {
                                    e.title == i && ((o = e.id), a());
                                });
                            });
                    }),
                        $(".fancybox-wrap").css("overflow", "hidden !important");
                },
                afterShow: function () {
                    $("#quick-view")
                        .hide()
                        .html(content)
                        .css("opacity", "1")
                        .fadeIn(function () {
                            $(".qv-product-images").addClass("loaded");
                        });
                },
                afterClose: function () {
                    $("#quick-view").removeClass().empty();
                },
            });
    });
}
$(document).ready(function () {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js").done(function () {
        quickView();
    });
}),
    $(window).resize(function () {
        $("#quick-view").is(":visible") && $(".qv-product-images").slick("setPosition");
    });
//# sourceMappingURL=/s/files/1/0557/7411/8083/t/8/assets/quickview.js.map?v=10427024678264987267
