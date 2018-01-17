/**
 * @fileoverview article.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @version 0.1.0.0, Oct 19, 2017
 */

import $ from 'jquery'
import QRious from 'qrious'
import {InitComment, InitToc, ShowEditor, InitHljs} from '../../../js/article'
import './common'

const Article = {
  /**
   * @description 页面初始化
   */
  init: () => {
    InitComment()
    InitHljs()

    Article._share('#articleShare');
    Article._share('#articleSideShare');

    $('#articleCommentBtn, #articleSideCommentBtn').click(function () {
      const $this = $(this)
      ShowEditor($this.data('title'), $this.data('id'))
    })

    if ($(window).height() >= $('body').height()) {
      $('.post__side').css('opacity', 1)
    }

    $('.post__side').css('left', (($('.post').offset().left - 20) / 2 - 27) + 'px');

    const windowHeight = $(window).height();

    $(window).scroll(function () {
      if ($(window).scrollTop() > 65) {
        $('.post__side').css('opacity', 1)
      } else {
        $('.post__side').css('opacity', 0)
      }

      if ($(window).scrollTop() > $('.article__bottom').offset().top -  windowHeight) {
        $('.post__side').css({
          'position': 'absolute',
          'top': $('.post').height() + 'px'
        })
      } else {
        $('.post__side').css({
          'position': 'fixed',
          'top': '50%'
        })
      }
    });

    $(window).scroll();
  },
  _share: (id) => {
    const $this = $(id)
    const $qrCode = $this.find('.article__code')
    const shareURL = $qrCode.data('url')
    const avatarURL = $qrCode.data('avatar')
    const title = encodeURIComponent($qrCode.data('title') + ' - ' + $qrCode.data('blogtitle')),
      url = encodeURIComponent(shareURL)

    const urls = {}
    urls.tencent = 'http://share.v.t.qq.com/index.php?c=share&a=index&title=' + title +
      '&url=' + url + '&pic=' + avatarURL
    urls.weibo = 'http://v.t.sina.com.cn/share/share.php?title=' +
      title + '&url=' + url + '&pic=' + avatarURL
    urls.google = 'https://plus.google.com/share?url=' + url
    urls.twitter = 'https://twitter.com/intent/tweet?status=' + title + ' ' + url

    $this.find('span').click(function () {
      const key = $(this).data('type')

      if (!key) {
        return;
      }

      if (key === 'wechat') {
        if ($qrCode.css('background-image') === 'none') {
          const qr = new QRious({
            element: $qrCode[0],
            value: shareURL,
            size: 128
          })
          $qrCode.css('background-image', `url(${qr.toDataURL('image/jpeg')})`).hide()
        }
        $qrCode.slideToggle()
        return false
      }

      window.open(urls[key], '_blank', 'top=100,left=200,width=648,height=618')
    })
  }
}

Article.init()