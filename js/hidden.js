$(document).ready(function () {
    var points = 0;
    var max_points = 0;
    var lives = 5;
    var ref_title = [];
    var ref_desc = "";
    var dial_title = $('.game_dialog_title');
    var dial_text = $('.game_dialog_text');
    var object = $('.object');
    var menuBtn = $('[data-theme-btn]');
    var theme = "";
    var lifeUp = 0;
    var musicOn = true;
    var soundOn = true;
    var closeTO;
    Cookies.set("lives", lives, { expires: 365 });
    Cookies.set("points", points, { expires: 365 });

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    $('.game_menu_item--i').click(function () {
        $("a", this).text() == 'X' ? $("a", this).text("i") : $("a", this).text("X");
        $('.game_menu_item--rules').toggleClass('display');
    });

    menuBtn.click(function () {
        theme = $(this).attr('data-theme-btn');
        object.attr('data-found', 'false');
        object.removeClass('found');

        $('[data-theme=' + theme + ']').addClass('active');
        $('.game_home').removeClass('game_home--active');

        if (theme == "movies") {
            max_points = 60;
        } else if (theme == "series") {
            max_points = 13;
        } else if (theme == "videogames") {
            max_points = 35;
        }

        lives = parseInt(Cookies.get("lives"));
        if (isNaN(lives) || lives < 1) {
            lives = 5;
            console.log(Cookies.get());
        }

        points = parseInt(Cookies.get("points"));
        if (isNaN(points) || points < 0) {
            points = 0;
        }

        if (Cookies.get("music") == "false") {
            musicOn = false;
            $('.info_sound--musics').addClass('off');
        }

        if (Cookies.get("sound") == "false") {
            soundOn = false;
            $('.info_sound--sounds').addClass('off');
        }

        for (let i = 1; i <= max_points; i++) {
            if (Cookies.get("ref_" + theme + "_" + i) == "true") {
                $('[data-id="' + i + '"]').attr('data-found', 'true');
                $('[data-id="' + i + '"]').addClass('found');
            }
        }

        if (Cookies.get("music") == "true" && musicOn == true && $('#music_' + theme)[0] !== undefined) {
            $('#music_' + theme)[0].volume = 0.5;
            $('#music_' + theme)[0].play();
            $('#music_' + theme)[0].loop = true;
        }

        $('.info_findings_maxpoints').text(max_points);
    });

    $('.game_btn--back').click(function () {
        $('[data-theme=' + theme + ']').removeClass('active');
        $('.game_home').addClass('game_home--active');
    });

    $('.info_sound--musics').click(function () {
        $(this).toggleClass('off');
        if (musicOn == true) {
            musicOn = false;
            if ($('#music_' + theme)[0] !== undefined) {
                $('#music_' + theme)[0].pause();
            }
            Cookies.set("music", "false", { expires: 365 });
        } else {
            musicOn = true;
            if ($('#music_' + theme)[0] !== undefined) {
                $('#music_' + theme)[0].play();
            }
            Cookies.set("music", "true", { expires: 365 });
        }
        console.log(Cookies.get("music"));
    });

    $('.info_sound--sounds').click(function () {
        $(this).toggleClass('off');
        if (soundOn == true) {
            soundOn = false;
            Cookies.set("sound", "false", { expires: 365 });
        } else {
            soundOn = true;
            Cookies.set("sound", "true", { expires: 365 });
        }
        console.log(Cookies.get("sound"));
        setCookie("sound", "test", 365);
        console.log(getCookie("sound"));
    });

    object.click(function () {
        obj_Id = $(this).attr('data-id');
        $('.game_dialog').addClass('active');
        $('.game_dialog_bg').addClass('active');
        $('.game_dialog_input').val("");

        let number = parseInt(obj_Id);
        let themeFR = "";

        if (theme == "movies") {
            switch (number) {
                case 1:
                    ref_title = ["Matrix", "The Matrix", "Matrix Reloaded", "Matrix Revolutions", "Matrix Revolution"];
                    ref_desc = "La cuillère n’existe pas.";
                    break;
                case 2:
                    ref_title = ["Le Seigneur des Anneaux", "seigneur des anneaux", "The Lord of the Rings", "Lord of the Rings", "LOTR", "La Communauté de l'Anneau", "The Fellowship of The Ring", "Les Deux Tours", "The Two Towers", "Le Retour du Roi", "Return Of The King"];
                    ref_desc = "Non sans raisons tombent les feuilles de la Lorien.";
                    break;
                case 3:
                    ref_title = ["Watchmen: les Gardiens", "Les Gardiens", "Watchmen", "Watch Men"];
                    ref_desc = "Le rêve américain où il est passé ? Ouvre un peu les yeux. Il est là.";
                    break;
                case 4:
                    ref_title = ["Le Cinquième Élément", "The Fifth Element", "Cinquième Élément", "Fifth Element", "le 5ème élément", "5ème élément", "5th element", "the 5th element", "5 elements"];
                    ref_desc = "À quoi ça sert de sauver la vie quand on voit ce que vous en faites.";
                    break;
                case 5:
                    ref_title = ["Shining", "The Shining"];
                    ref_desc = "HERE'S JOHNNY !";
                    break;
                case 6:
                    ref_title = ["Hardcore Henry"];
                    ref_desc = "EZ";
                    break;
                case 7:
                    ref_title = ["Akira"];
                    ref_desc = "TETSUOOOOOOOOO !";
                    break;
                case 8:
                    ref_title = ["Star Wars", "Star Wars I", "Star Wars II", "Star Wars III", "Star Wars IV", "Star Wars V", "Star Wars VI", "Star Wars 1", "Star Wars 2", "Star Wars 3", "Star Wars 4", "Star Wars 5", "Star Wars 6", "La Guerre des Étoiles", "Guerre des Étoiles", "La Menace Fantôme", "Menace Fantôme", "The Phantom Menace", "Phantom Menace", "La Guerre des Clones", "L'Attaque des Clones", "Attaque des Clones", "Guerre des Clones", "The Clone Wars", "Clone Wars", "Un Nouvel Espoir", "A New Hope", "Empire Strikes Back", "The Empire Strikes Back", "L'Empire Contre-attaque", "L'Empire Contre attaque", "Empire Contre-attaque", "Empire Contre attaque", "Le Retour du Jedi", "Retour du Jedi", "Return of the Jedi", "Rogue One", "R2-D2"];
                    ref_desc = "The ability to speak does not make you intelligent.";
                    break;
                case 9:
                    ref_title = ["Conan le Barbare", "Conan The Barbarian", "Conan"];
                    ref_desc = "Il est Conan, un cimmérien. Il ne pleurera pas, alors je pleure pour lui.";
                    break;
                case 10:
                    ref_title = ["Atlantide: l'Empire Perdu", "Atlantis the Lost Empire", "Atlantide", "Atlantis"];
                    ref_desc = "The heart of Atlantis lies in the eyes their king.";
                    break;
                case 11:
                    ref_title = ["La Planète aux Trésors: Un Nouvel Univers", "Treasure PLanet", "Planète aux trésors", "la Planète aux trésors"];
                    ref_desc = "Rien que l’obsession de toute une vie, je m’en remettrais.";
                    break;
                case 12:
                    ref_title = ["La Planète des Singes", "Planet of the Apes", "Planète des Singes", "Dawn of the Planet of the Apes", "Rise of the Planet of the Apes", "War for the Planet of the Apes"];
                    ref_desc = "Apes together strong !";
                    break;
                case 13:
                    ref_title = ["Wall-E", "wall e", "walle"];
                    ref_desc = "Eeeveee";
                    break;
                case 14:
                    ref_title = ["Harry Potter", "Harry Potter à l'écolde des sorciers", "Harry Potter et la pierre philosophale", "l'écolde des sorciers", "la pierre philosophale", "harry potter and the philosopher's stone", "philosopher's stone", "Deathly Hallows", "The Deathly Hallows", "les reliques de la mort", "reliques de la mort", "Wizarding World"];
                    ref_desc = "Je jure solennellement que mes intentions sont mauvaises.";
                    break;
                case 15:
                    ref_title = ["La Grande Aventure Lego", "Lego le film", "Lego Movie", "Lego", "Film Lego", "Grande Aventure Lego"];
                    ref_desc = "SPACESHIP !";
                    break;
                case 16:
                    ref_title = ["Incassable", "Unbreakable"];
                    ref_desc = "Vous savez ce qui est le plus effrayant ? D’ignorer quelle est sa place dans ce monde. C’est… un sentiment effroyable.";
                    break;
                case 17:
                    ref_title = ["Inglourious Basterds", "Inglourious Bastards", "Inglorious Basterds", "Inglorious Bastards", "Inglourious Basterd", "Inglourious Bastard", "Inglorious Basterd", "Inglorious Bastard"];
                    ref_desc = "Attendez la crème.";
                    break;
                case 18:
                    ref_title = ["Kuzco: L'empereur Mégalo", "Kuzco", "The Emperor's New Groove", "Emperor's New Groove", "The Emperors New Groove", "Emperors New Groove"];
                    ref_desc = "Quoi, tu tiens à entendre tous ces mots dans l'ordre ?";
                    break;
                case 19:
                    ref_title = ["Nausicaä de la vallée du vent", "Nausicaä", "Kaze no tani no Naushika", "Naushika", "Nausicaa of the Valley of the Wind", "nausica"];
                    ref_desc = "Nos vies sont comme le vent, ou les sons… Nous naissons, raisonnons avec ce qui nous entoure… Puis disparaissons.";
                    break;
                case 20:
                    ref_title = ["L'Armée des 12 Singes", "Armée des 12 Singes", "Twelve Monkeys", "12 singes", "douze singes", "Armée des douze Singes", "L'Armée des douze Singes"];
                    ref_desc = "Il n’y a ni vérités, ni mensonges, juste des opinions.";
                    break;
                case 21:
                    ref_title = ["Le Château dans le Ciel", "Tenkû no shiro Rapyuta", "Château dans le Ciel", "Laputa", "Laputa: the Castle in the Sky", "The Castle in the Sky", "Castle in the Sky"];
                    ref_desc = "Laputa ne mourra pas. Elle renaîtra de ses cendres. Sa puissance alimente les rêves de l’humanité.";
                    break;
                case 22:
                    ref_title = ["Le Géant de Fer", "Géant de fer", "The Iron Giant", "Iron Giant"];
                    ref_desc = "Superman...";
                    break;
                case 23:
                    ref_title = ["Shrek", "Shrek 2", "Shrek 3", "Shrek le Troisième", "petit biscuit"];
                    ref_desc = "Le garde champêtre ? Celui qui pue qui pète ?";
                    break;
                case 24:
                    ref_title = ["Les Indestructibles", "Indestructibles", "The Incredibles", "Incredibles"];
                    ref_desc = "Après tout, je suis ton plus grand fan.";
                    break;
                case 25:
                    ref_title = ["Pirates des Caraïbes", "Pirates of the Caribbean", "La Malédiction du Black Pearl", "The Curse of the Black Pearl", "Le Secret du coffre maudit", "Dead Man's Chest", "Jusqu'au bout du monde", "At World's End", "Pirate des Caraïbes", "Pirate of the Caribbean"];
                    ref_desc = "Nulle cause n’est perdue… s’il y a encore un pauvre fou prêt à se battre pour elle.";
                    break;
                case 26:
                    ref_title = ["Toy Story", "Toy Story 2", "Toy Story 3", "Toy Story 4", "toys story"];
                    ref_desc = "Vers l'infini et au delà !";
                    break;
                case 27:
                    ref_title = ["Mad Max: Fury Road", "Mad Max", "Fury Road"];
                    ref_desc = "Witness me.";
                    break;
                case 28:
                    ref_title = ["Fight Club"];
                    ref_desc = "Avec l’insomnie, plus rien n’est réel ! Tout devient lointain. Tout est une copie, d’une copie, d’une copie…";
                    break;
                case 29:
                    ref_title = ["O'Brother", "O Brother, Where Art Thou?", "O brother", "o'brothers", "o brothers"];
                    ref_desc = "Peut-être mais je suis pas « Fop », bordel de merde, j’suis Dapper Dan moi !";
                    break;
                case 30:
                    ref_title = ["Ratatouille"];
                    ref_desc = "Il est difficile d’imaginer origine plus modeste que celle du génie qui officie maintenant chez Gusteau et qui est a nos yeux, rien moins que le plus grand cuisinier de France.";
                    break;
                case 31:
                    ref_title = ["Léon", "Léon: The Professional", "The Professional"];
                    ref_desc = "Dis pas de mal des cochons, ils valent mieux que la plupart des gens.";
                    break;
                case 32:
                    ref_title = ["Sixième Sens", "The Sixth Sense", "Sixth Sense", "6ème sens", "6th sense", "6 sens", "le sixieme sens"];
                    ref_desc = "Je vois des gens qui sont morts.";
                    break;
                case 33:
                    ref_title = ["Men In Black", "MIB", "Men in Black 2", "Men in Black 3"];
                    ref_desc = "La différence entre toi et moi, c’est que moi j’ai la classe.";
                    break;
                case 34:
                    ref_title = ["Retour vers le Futur", "Retour vers le Futur 2", "Retour vers le Futur 3", "Back to the Future", "BTTF", "convecteur temporel"];
                    ref_desc = "Là où on va, on n’a pas besoin de route !";
                    break;
                case 35:
                    ref_title = ["Wallace et Gromit: Un Mauvais Pantalon", "Wallace and Gromit: Wrong Trousers", "Wallace et Gromit", "Wallace and Gromit", "Wallace & Gromit", "un mauvais pantalon", "wrong trousers", "wallas et gromit"];
                    ref_desc = "À la santé des locataires !";
                    break;
                case 36:
                    ref_title = ["Madagascar", "Madagascar 2", "Madagascar 3"];
                    ref_desc = "C'est nul ici !";
                    break;
                case 37:
                    ref_title = ["Le Roi Lion", "The Lion King", "Roi Lion", "Lion King", "Le Roi Lion 2", "The Lion King 2"];
                    ref_desc = "N'oublie pas qui tu es.";
                    break;
                case 38:
                    ref_title = ["Raiponce", "Tangled", "Rapunzel"];
                    ref_desc = "Ai-je bien articulé, mère ?";
                    break;
                case 39:
                    ref_title = ["Dragons", "How to Train your Dragon", "HTTYD", "dragon", "Train your Dragon"];
                    ref_desc = "Je te revaudrai ça, reptile inutile !";
                    break;
                case 40:
                    ref_title = ["Donnie Darko", "donny darko"];
                    ref_desc = "Pourquoi ce déguisement d’homme ridicule ?";
                    break;
                case 41:
                    ref_title = ["Interstellar"];
                    ref_desc = "Docking.";
                    break;
                case 42:
                    ref_title = ["Inception"];
                    ref_desc = "Quel est le parasite le plus résistant ? Une bactérie ? un virus ? un ver intestinal ? Une idée.";
                    break;
                case 43:
                    ref_title = ["La Ligne Verte", "The Green Mile", "linge verte", "green mile"];
                    ref_desc = "Je suis fatigué patron...";
                    break;
                case 44:
                    ref_title = ["Le Parfum: Histoire d'un Meurtrier", "The Perfume", "Le Parfum", "The Perfume: Story of a Murderer"];
                    ref_desc = "Notre langage ne vaut rien pour décrire le monde des odeurs.";
                    break;
                case 45:
                    ref_title = ["2001: l'Odyssée de l'Espace", "2001: A Space Odyssey", "2001", "l'Odyssée de l'Espace", "A Space Odyssey"];
                    ref_desc = "Je suis désolé Dave, je crains de ne pas pouvoir faire ça.";
                    break;
                case 46:
                    ref_title = ["300", "trois cent", "3 cent"];
                    ref_desc = "Remember us.";
                    break;
                case 47:
                    ref_title = ["Django", "Django Unchained"];
                    ref_desc = "J'aime ta façon de mourir, le boy.";
                    break;
                case 48:
                    ref_title = ["Rocky", "Rocky 2", "Rocky 3", "Rocky 4", "Rocky 5", "Rocky Balboa"];
                    ref_desc = "I'm gonna know for the first time in my life, see, that I weren't just another bum from the neighborhood.";
                    break;
                case 49:
                    ref_title = ["Edward aux mains d'argent", "Edward Scissorhands", "Edward", "Edward aux mains d argent"];
                    ref_desc = "Sometimes you can still catch me dancing in it.";
                    break;
                case 50:
                    ref_title = ["Batman: The Dark Knight", "Batman", "Joker"];
                    ref_desc = "Why so serious ?";
                    break;
                case 51:
                    ref_title = ["No Country For Old Men", "No Country For Old Man"];
                    ref_desc = "You know how this is going to turn out, don't you ?";
                    break;
                case 52:
                    ref_title = ["Super 8", "super huit"];
                    ref_desc = "Je sais que de mauvaises choses arrivent, mais vous pouvez toujours vivre.";
                    break;
                case 53:
                    ref_title = ["Bionicle: Le Masque de Lumière", "Bionicle: The Mask of Light", "Le Masque de Lumière", "The Mask of Light", "Masque de Lumière", "Mask of Light", "Bionicle"];
                    ref_desc = "La cité de l'esprit divin, ô toi mon île enfin retrouvée.";
                    break;
                case 54:
                    ref_title = ["Deadpool", "Dead pool"];
                    ref_desc = "Avez-vous vu cet homme ?!";
                    break;
                case 55:
                    ref_title = ["La Guerre des Mondes", "War of the Worlds", "Guerre des Mondes", "War of Worlds"];
                    ref_desc = "C'est pas une guerre pas plus qu'il y a de guerre entre les hommes et les vers de terre. C'est une extermination.";
                    break;
                case 56:
                    ref_title = ["Dead Man", "Deadman"];
                    ref_desc = "Cette arme remplacera votre langue. Vous apprendrez à parler à travers elle. Et votre poésie sera désormais écrite avec du sang.";
                    break;
                case 57:
                    ref_title = ["Koyaanisqatsi"];
                    ref_desc = "Koyaanisqatsi.";
                    break;
                case 58:
                    ref_title = ["Sleepy Hollow: La Légende du Cavalier Sans Tête", "Sleepy Hollow"];
                    ref_desc = "Je n’aurais pas dû venir à Sleepy Hollow, mon amour pour la raison se heurte au monde des esprits.";
                    break;
                case 59:
                    ref_title = ["Wanted: Choisis Ton Destin", "Wanted"];
                    ref_desc = "I'm sorry !";
                    break;
                case 60:
                    ref_title = ["King Kong", "kong"];
                    ref_desc = "Les avions n’ont rien fait. C’est la belle qui a tué la bête.";
                    break;
                default:

            }
            themeFR = "quel film";
        } else if (theme == "series") {
            switch (number) {
                case 1:
                    ref_title = ["Lost", "Lost: Les disparus", "Lost : Les disparus", "Lost:Les disparus"];
                    ref_desc = "Les gars... Où est-ce qu'on est tombé ?";
                    break;
                case 2:
                    ref_title = ["Dark", "Netflix Dark", "Dark Netflix"];
                    ref_desc = "La distinction entre le passé, le présent et le futur n'est qu'une illusion tenace.";
                    break;
                case 3:
                    ref_title = ["Watership Down", "La Colline aux Lapins", "Colline aux Lapins", "La Colline de Watership Down", "Colline de Watership Down"];
                    ref_desc = "";
                    break;
                case 4:
                    ref_title = ["FLCL", "Furi Kuri", "Fuli Kuli"];
                    ref_desc = "";
                    break;
                case 5:
                    ref_title = ["Berserk", "Kenpuu Denki Berserk"];
                    ref_desc = "";
                    break;
                case 6:
                    ref_title = ["The Lost Room", "Lost Room"];
                    ref_desc = "";
                    break;
                case 7:
                    ref_title = ["Avatar, le dernier maître de l'air", "Avatar", "Avatar The Last Airbender", "The Last Airbender", "Last Airbender", "le dernier maître de l'air", "dernier maître de l'air", "The Legend of Korra", "Legend of Korra", "Korra", "La Légende de Korra", "Légende de Korra"];
                    ref_desc = "";
                    break;
                case 8:
                    ref_title = ["Supernatural"];
                    ref_desc = "";
                    break;
                case 9:
                    ref_title = ["Kill La Kill"];
                    ref_desc = "";
                    break;
                case 10:
                    ref_title = ["Samouraï Jack"];
                    ref_desc = "";
                    break;
                case 11:
                    ref_title = ["Malcolm", "Malcolm in the Middle"];
                    ref_desc = "";
                    break;
                case 12:
                    ref_title = ["Les Supers Nanas", "The Powerpuff Girls", "Powerpuff Girls", "Power puff Girls", "Supers Nanas", "Powerpuff Girls"];
                    ref_desc = "";
                    break;
                case 13:
                    ref_title = ["South Park"];
                    ref_desc = "";
                    break;
                default:

            }
            themeFR = "quelle série ou anime"
        } else if (theme == "videogames") {
            switch (number) {
                case 1:
                    ref_title = ["The Binding of Isaac", "The Binding of Isaac Rebirth", "Isaac", "tboi", "Binding of Isaac", "Binding of Isaac Rebirth "];
                    ref_desc = "Isaac and his mother lived alone in a small house on a hill.";
                    break;
                case 2:
                    ref_title = ["Skullgirls", "Skullgirls Second Encore", "Skullgirls 2nd Encore", "skull girls", "skullgirl", "skull girl"];
                    ref_desc = "It's SHOWTIME !";
                    break;
                case 3:
                    ref_title = ["Lego Star Wars", "Lego", "Lego Star Wars: the Complete saga", "Lego Star Wars: the original trilogy", "lego starwars"];
                    ref_desc = "Roger roger !";
                    break;
                case 4:
                    ref_title = ["Blasphemous"];
                    ref_desc = "Sorrowful be the heart, penitent one.";
                    break;
                case 5:
                    ref_title = ["Bloodborne", "Blood Borne", "Buraddobōn", "bloodborn", "blood born"];
                    ref_desc = "What are you still doing here? Enough trembling in your boots. A hunter must hunt.";
                    break;
                case 6:
                    ref_title = ["Psychonauts", "psycho nauts", "psychonaut", "psycho naut"];
                    ref_desc = "C'est... Un morceau de bacon ?";
                    break;
                case 7:
                    ref_title = ["Ratchet & Clank", "Ratchet et Clank", "Ratchet and Clank", "ratchet", "ratchet gladiator"];
                    ref_desc = "M. Zurkon ne vient pas en paix.";
                    break;
                case 8:
                    ref_title = ["Devil Daggers", "Devildaggers", "devil dagger", "devildagger"];
                    ref_desc = "SWARMED";
                    break;
                case 9:
                    ref_title = ["Overwatch", "Over Watch"];
                    ref_desc = "Nerf this !";
                    break;
                case 10:
                    ref_title = ["Dark Souls", "Dark Souls 2", "Dark Souls 3", "Dark Souls II", "Dark Souls III", "dark soul", "darksouls", "darksoul"];
                    ref_desc = "The sun is a wondrous body. Like a magnificent father ! If only I could be so grossly incandescent !";
                    break;
                case 11:
                    ref_title = ["Borderlands", "Borderlands 2", "Borderlands 3", "Border Lands", "borderland", "border land"];
                    ref_desc = "DES ESCALIERS ? NOOOOOOOOOOON";
                    break;
                case 12:
                    ref_title = ["Dead Space", "Dead Space 2", "Dead Space 3"];
                    ref_desc = "Cut off thier limbs...";
                    break;
                case 13:
                    ref_title = ["Helltaker", "Hell Taker"];
                    ref_desc = "IGNITE THE SIN MACHINE !";
                    break;
                case 14:
                    ref_title = ["Portal", "Portal 2"];
                    ref_desc = "SPAAAAAAAAACE !";
                    break;
                case 15:
                    ref_title = ["Rayman", "Ray Man", "Rayman 2", "Rayman 3", "Rayman Hoodlum Havoc"];
                    ref_desc = "Yeah !";
                    break;
                case 16:
                    ref_title = ["Shadow of the Colossus", "Wanda to Kyozō", "sotc", "Shadow of Colossus"];
                    ref_desc = "Raise thy sword by the light, and head to the place where the sword's light gathers.";
                    break;
                case 17:
                    ref_title = ["Fallout", "Fallout 4", "Fallout 3", "Fallout 76", "Fallout New Vegas"];
                    ref_desc = "Comme d'habitude, une colonie a besoin de votre aide.";
                    break;
                case 18:
                    ref_title = ["Dishonored", "Dishonored 2"];
                    ref_desc = "Ce que tu fais de tes pouvoirs ne dépend que de toi. Il en fut de même pour tous les autres avant toi.";
                    break;
                case 19:
                    ref_title = ["Bioshock", "Bioshock 2", "Bio Shock"];
                    ref_desc = "L'homme choisit, l'esclave obéit.";
                    break;
                case 20:
                    ref_title = ["Alice: Madness Returns", "Alice Retour au pays de la folie", "Madness Returns", "Alice", "Alice: Madness Return", "Madness Return"];
                    ref_desc = "Le glaive Vorpalin perce et tranche !";
                    break;
                case 21:
                    ref_title = ["Castle Crashers", "Castlecrashers", "castle crasher", "castlecrasher"];
                    ref_desc = "I hate my job.";
                    break;
                case 22:
                    ref_title = ["Half-Life", "Half-Life 2", "Half-Life 2: Episode 1", "Half-Life 2: Episode 2", "HalfLife", "HalfLife 2", "Half Life", "Half Life 2"];
                    ref_desc = "Réveillez-vous, M. Freeman...";
                    break;
                case 23:
                    ref_title = ["Infamous", "Infamous 2", "Infamous: Second Son"];
                    ref_desc = "I CALL IT THE DUNBAR BEAM !";
                    break;
                case 24:
                    ref_title = ["Halo", "Halo 2", "Halo 3", "Halo 4", "Halo: Combat Evolved", "Halo ODST", "Halo Reach"];
                    ref_desc = "Wake Me... When You Need Me.";
                    break;
                case 25:
                    ref_title = ["Darksiders", "Dark siders", "darksider", "dark sider"];
                    ref_desc = "I haven't forgotten.";
                    break;
                case 26:
                    ref_title = ["Super Meat Boy", "Super MeatBoy", "Meat Boy", "Meatboy", "SuperMeatBoy"];
                    ref_desc = "SUUUPER MEAT BOY !";
                    break;
                case 27:
                    ref_title = ["Kya: Dark Lineage", "Kya"];
                    ref_desc = "Oui, c'est ça !";
                    break;
                case 28:
                    ref_title = ["Doom"];
                    ref_desc = "DOOM !";
                    break;
                case 29:
                    ref_title = ["Hotline Miami", "Hot Line Miami"];
                    ref_desc = "Do you like hurting other people ?";
                    break;
                case 30:
                    ref_title = ["Wolfenstein", "Wolfenstein The New Order", "Wolfenstein The New Colossus"];
                    ref_desc = "You still got it, old man.";
                    break;
                case 31:
                    ref_title = ["007: Nightfire", "Nightfire", "James Bond Nightfire", "James Bond 007 Nightfire", "007 Night fire", "Night fire", "James Bond Night fire", "James Bond 007 Night fire", "james bond", "007"];
                    ref_desc = "Je ne donnerai qu'un 2 pour le plongeon !";
                    break;
                case 32:
                    ref_title = ["Elden Ring", "Eldenring"];
                    ref_desc = "Oh, Elden Ring... Shattered... By someone or something...";
                    break;
                case 33:
                    ref_title = ["Soul Calibur", "Soul Edge", "Soulcalibur", "Souledge", "Soul Calibur VI", "Soul Calibur 7"];
                    ref_desc = "Sword, quench your thirst !";
                    break;
                case 34:
                    ref_title = ["The Elder Scrolls V: Skyrim", "The Elder Scrolls 5: Skyrim", "Skyrim", "The Elder Scrolls", "Elder Scrolls", "Elder Scrolls V: Skyrim", "The Elder Scrolls V", "Elder Scrolls V", "The Elder Scrolls 5", "Elder Scrolls 5"];
                    ref_desc = "Avant j'étais un aventurier comme vous, puis j'ai pris une flèche dans le genoux.";
                    break;
                case 35:
                    ref_title = ["Demon's Souls", "Demons Soul", "Demon Souls", "Demon Soul"];
                    ref_desc = "Umbasa !";
                    break;
                case 36:
                    ref_title = ["Destroy All Humans!"];
                    ref_desc = "Umbasa !";
                    break;
                case 37:
                    ref_title = ["Remnants of the Ashes"];
                    ref_desc = "Umbasa !";
                    break;
                case 38:
                    ref_title = ["Left 4 Dead"];
                    ref_desc = "Umbasa !";
                    break;
                case 39:
                    ref_title = ["Spyro"];
                    ref_desc = "Umbasa !";
                    break;
                case 40:
                    ref_title = ["Demon's Souls", "Demons Soul", "Demon Souls", "Demon Soul"];
                    ref_desc = "You have a heart of gold.";
                    break;
                default:
            }
            themeFR = "quel jeu vidéo"
        } else {
            themeFR = "quoi";
        }

        if ($('[data-id=' + obj_Id + ']').attr('data-found') == "true") {
            dial_title.text(ref_title[0]);
            dial_text.text(ref_desc);

            $('.game_dialog_input').hide();
            $('.game_dialog_guess').hide();
        } else {
            dial_title.text("À " + themeFR + " cet objet fait-il référence ?");
            dial_text.text("");

            $('.game_dialog_input').show();
            $('.game_dialog_guess').show();
        }

        $('.game_dialog_input').focus();
    });

    if ($('.game-dialog').hasClass('active')) {
        $('.game_dialog_input').focus();
    }
      
    function onBackKeyDown() {
        $('.game_dialog').removeClass('active');
        $('.game_dialog_bg').removeClass('active');
        clearTimeout(closeTO);
    }

    $('.game_dialog_bg, .game_dialog_close').click(function () {
        $('.game_dialog').removeClass('active');
        $('.game_dialog_bg').removeClass('active');
        clearTimeout(closeTO);
    });

    $('.game_victory_close').click(function () {
        $('.game_victory').removeClass('active');
    });

    $('.game_dialog_guess').click(function () {
        if ($('.game_dialog_input--' + theme).val() != "") {
            guessingAnswer();
        }
    });

    $('.game_dialog_input').keyup(function (e) {
        if (e.keyCode == 13) {
            if ($('.game_dialog_input--' + theme).val() != "") {
                guessingAnswer();
            }
        }
    });

    function guessingAnswer() {
        let user_title = $('.game_dialog_input--' + theme).val();
        let correct = false;

        for (let i = 0; i < ref_title.length; ++i) {
            let guess = user_title.toLowerCase();
            let answer = ref_title[i].toLowerCase();
            guess = guess.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            answer = answer.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            guess = guess.replace(/[^a-z0-9\s]/gi, '');
            answer = answer.replace(/[^a-z0-9\s]/gi, '');
            guess = guess.trim();
            answer = answer.trim();

            if (guess == answer) {
                $('[data-id=' + obj_Id + ']').attr('data-found', 'true');
                $('[data-id=' + obj_Id + ']').addClass('found');
                Cookies.set("ref_" + theme + "_" + obj_Id, "true", { expires: 365 });
                console.log(Cookies.get("ref_" + theme + "_" + obj_Id));
                correct = true;
                break;
            }
        }

        if (correct == false) {
            if (soundOn == true && $('#wrong')[0] !== undefined) {
                $('#wrong')[0].play();
            }
            lives--;
            $('.game_dialog_input').addClass("shake");
            $('.info_lives_heart[data-live="' + (lives + 1) + '"]').addClass('backward');
            setTimeout(function () {
                $('.info_lives_heart[data-live="' + (lives + 1) + '"]').removeClass('full');
                $('.info_lives_heart[data-live="' + (lives + 1) + '"]').removeClass('backward');
            }, 500);
            Cookies.set("lives", lives, { expires: 365 });
            $('.game_dialog_input').val("");
            dial_text.text("Mauvaise réponse !");
            setTimeout(function () {
                $('.game_dialog_input').removeClass("shake");
            }, 300);
        } else {
            if (soundOn == true && $('#correct')[0] !== undefined) {
                $('#correct')[0].play();
            }
            dial_title.addClass('anim');
            displayAnswer();
            points++;
            Cookies.set("points", points, { expires: 365 });
            console.log(Cookies.get("points"));
            if (lives < 5) {
                lifeUp++;
                Cookies.set("lifeUp", lifeUp, { expires: 365 });
            }
            $('.info_findings_points').text(points);
            closeTO = setTimeout(function () {
                $('.game_dialog').removeClass("active");
                $('.game_dialog_bg').removeClass("active");
                dial_title.removeClass('anim');
            }, 2500);
        }

        if (lives == 0) {
            init();
            lost();
        }

        if (lifeUp == 5) {
            lives++;
            $('.info_lives_heart[data-live="' + (lives) + '"]').addClass('forward');
            setTimeout(function () {
                $('.info_lives_heart[data-live="' + (lives) + '"]').addClass('full');
                $('.info_lives_heart[data-live="' + (lives) + '"]').removeClass('forward');
            }, 500);
            lifeUp = 0;
        }

        if (max_points != 0) {
            if (points == max_points) {
                setTimeout(function () {
                    $('.game_dialog').removeClass('active');
                    $('.game_victory').addClass('active');
                    if (soundOn == true && $('#victory')[0] !== undefined) {
                        $('#victory')[0].play();
                    }
                }, 1000);
            }
        }

        $('.game_dialog_input').focus();
        console.log(Cookies.get());
    };

    function displayAnswer() {
        dial_title.text(ref_title[0]);
        dial_text.text(ref_desc);
        $('.game_dialog_input').hide();
        $('.game_dialog_guess').hide();
    };

    function init() {
        $('.game_menu_infos').removeClass('active');
        setTimeout(function () {
            $('.game_menu').removeClass('reduced');
        }, 1000);
        $('.info_lives_heart').addClass('full');
        $('.info_lives_heart').removeClass('forward');
        $('.info_lives_heart').removeClass('backward');
        $('.game_dialog').removeClass('active');
        $('.game_dialog_bg').removeClass('active');
        setTimeout(function () {
            $('.game_home').addClass('game_home--active');
        }, 2000);
        setTimeout(function () {
            $('.game_content').removeClass('active');
        }, 3000);
        dial_title.removeClass('anim');
        $('#music_' + theme)[0].pause();
        $('#music_' + theme)[0].currentTime = 0;
        theme = "";
        points = 0;
        max_points = 0;
        lives = 5;
        lifeUp = 0;
        $('.info_findings_points').text(points);
    };

    function lost() {
        $('.game_menu_item--title').text('Perdu !');
        $('.game_menu_item--subtitle').text('Retentez votre chance :');
    };
});
