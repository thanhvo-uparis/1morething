(function ($) {
    var options = {
        'onclick': function (elem, type, file) {
        },
        'expandSpeed': 500,
        'collapseSpeed': 500,
        'expandEasing': null,
        'collapseEasing': null,
    };

    var methods = {
        init: function (o) {
            if ($(this).length == 0) {
                return;
            }
            $this = $(this);
            $.extend(options, o);

            var root_id = $('#jao').data('root');
            $this.html('<ul class="exercice"><li class="drive directory collapsed selected" data-id="root"><a href="#" data-id="' + root_id + '" data-type="dir">All locations</a></li></ul>');
            openfolder(root_id);
        },
        open: function (id) {
            openfolder(id);
        },
        close: function (id) {
            closedir(id);
        }
    };

    // ouvrir une location par id
    openfolder = function (id) {
        if ($this.find('a[data-id="' + id + '"]').parent().hasClass('expanded')) {
            return;
        }
        var ret;

        // ouvrir une location par id
        ret = $.ajax({
            url: 'connectors/jaoconnector.php',
            data: {id: id},
            context: $this,
            dataType: 'json',
            beforeSend: function () {
                this.find('a[data-id="' + id + '"]').parent().addClass('wait');
            }
        }).done(function (datas) {
            ret = '<ul class="exercice" style="display: none">';
            // parcourir le tableau de sous-locations retourné Et append à html
            for (ij = 0; ij < datas.length; ij++) {
                classe = 'directory collapsed';
                ret += '<li class="' + classe + '" data-id="' + datas[ij].id + '">';
                ret += '<span class="material-icons-outlined delete-localities"> delete_outline </span>';
                ret += '<span class="material-icons-outlined edit-localities"> create </span>';
                ret += '<span class="material-icons-outlined new-localities"> add </span>';
                ret += '<a href="#" data-id="' + datas[ij].id + '" class="localities-title">' + datas[ij].label + '</a>';
                ret += '</li>';
            }
            ret += '</ul>';

            this.find('a[data-id="' + id + '"]').parent().removeClass('wait').removeClass('collapsed').addClass('expanded');
            this.find('a[data-id="' + id + '"]').after(ret);
            this.find('a[data-id="' + id + '"]').next().slideDown(options.expandSpeed, options.expandEasing);
            setevents();
        }).done(function () {
        });
    };

    // fermer une location par id
    closedir = function (id) {
        $this.find('a[data-id="' + id + '"]').next().slideUp(options.collapseSpeed, options.collapseEasing, function () {
            $(this).remove();
        });
        $this.find('a[data-id="' + id + '"]').parent().removeClass('expanded').addClass('collapsed');
        setevents();
    };

    ajaxAddFolder = function ($this, label, parentid) {
        // appel à ajax - ajouter une location
        $.ajax({
            type: "POST",
            url: 'connectors/new-localities.php',
            data: {
                parentid: parentid,
                label: label
            },
            success: function (response) {
                if (response.status) {
                    if ($this.hasClass('expanded')) {
                        var new_item = '<li class="directory collapsed" data-id="' + response.id + '"><span class="material-icons-outlined delete-localities"> delete_outline </span><span class="material-icons-outlined edit-localities"> create </span><span class="material-icons-outlined new-localities"> add </span><a href="#" data-id="' + response.id + '" class="localities-title">' + response.label + '</a></li>';
                        $this.closest('li').find('ul').append(new_item);
                        setevents();
                    }
                }
            },
            dataType: 'json'
        });
    };

    // les actions: click
    setevents = function () {
        $this.find('li a').unbind('click');
        // lier la fonction définie lors l'utilisateur en cliquant sur un élément
        $this.find('li a').bind('click', function () {
            options.onclick(this, $(this).attr('data-type'), $(this).attr('data-id'));
            $this.find('li').removeClass('selected');
            $(this).parent().addClass('selected');
            return false;
        });
        // lier pour réduire ou développer des éléments
        $this.find('li.directory.collapsed a').bind('click', function () {
            methods.open($(this).attr('data-id'));
            return false;
        });
        $this.find('li.directory.expanded a').bind('click', function () {
            methods.close($(this).attr('data-id'));
            return false;
        });

        // supprimer une location
        $this.find('li .delete-localities').bind('click', function () {
            var $this = $(this);
            var id = $this.closest('li').data('id');
            // appel à ajax - supprimer une location
            $.ajax({
                type: "POST",
                url: 'connectors/delete-localities.php',
                data: {
                    id: id,
                },
                success: function (response) {
                    $this.closest('li').remove();
                },
                dataType: 'json'
            });
        });

        // ajouter une nouvelle location au niveau supérieur
        $('.add-new-localities').bind('click', function () {
            var $this = $(this);
            showDialog({
                title: 'Add new',
                id: 'ju-dialog',
                text: '<input type="text" class="dialog-text-input">',
                negative: {
                    title: 'Cancel'
                },
                positive: {
                    title: 'Create',
                    onClick: function () {
                        var label = $('.dialog-text-input').val();
                        ajaxAddFolder($('li[data-id="root"]'), label, '');
                    }
                }
            });
        });

        // ajouter une nouvelle location
        $this.find('li .new-localities').bind('click', function () {
            var $this = $(this);
            var parentid = $this.closest('li').data('id');
            showDialog({
                title: 'Add new',
                id: 'ju-dialog',
                text: '<input type="text" class="dialog-text-input">',
                negative: {
                    title: 'Cancel'
                },
                positive: {
                    title: 'Create',
                    onClick: function () {
                        var label = $('.dialog-text-input').val();
                        ajaxAddFolder($this.closest('li'), label, parentid);
                    }
                }
            });
            return false;
        });

        // modifier une location
        $this.find('li .edit-localities').bind('click', function () {
            var id = $(this).closest('li').data('id');
            var label = $('.localities-title[data-id="' + id + '"]').html();
            showDialog({
                title: 'Update',
                id: 'ju-dialog',
                text: '<input type="text" class="dialog-text-input" value="' + label + '">',
                negative: {
                    title: 'Cancel'
                },
                positive: {
                    title: 'Update',
                    onClick: function () {
                        var new_label = $('.dialog-text-input').val();
                        $('.localities-title[data-id="' + id + '"]').html(new_label);
                        // appel à ajax -modifier une location
                        $.ajax({
                            type: "POST",
                            url: 'connectors/update-localities.php',
                            data: {
                                id: id,
                                new_label: new_label
                            },
                            success: function (response) {

                            },
                            dataType: 'json'
                        });
                    }
                }
            });
            return false;
        });

    };

    $.fn.exercice = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            //error
        }
    };
})(jQuery);
