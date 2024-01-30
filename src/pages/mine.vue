<template>
  <div v-show="show" ref="library">
    <div class="mine">
      <!-- 这里放我的头像 -->
      <img alt="mine" class="avatar" :src="resizedAvatarUrl" loading="lazy" />
      <h1>
        {{ data.user.nickname }}
      </h1>
    </div>

    <div class="liked-songs" @click="goToLikedSongsList">
      <div class="bottom">
        <!--我喜欢的音乐-->
        <div class="titles">
          <div class="title">{{ $t('library.likedSongs') }}</div>
        </div>
        <!-- 按钮 -->
        <button @click.stop="openPlayModeTabMenu">
          <svg-icon icon-class="play" />
        </button>
      </div>
    </div>

    <div class="index-row">
      <div class="title">For You</div>
      <div class="for-you-row">
        <DailyTracksCard ref="DailyTracksCard" />
        <FMCard />
      </div>
    </div>

    <div class="section-two">
      <div class="tabs-row">
        <div class="tabs">
          <!--          第一个,全部歌单-->
          <div
            class="tab dropdown"
            :class="{ active: currentTab === 'playlists' }"
            @click="updateCurrentTab('playlists')"
          >
            <span class="text"
              >{{
                {
                  all: $t('contextMenu.allPlaylists'),
                  mine: $t('contextMenu.minePlaylists'),
                  liked: $t('contextMenu.likedPlaylists'),
                }[playlistFilter]
              }}
            </span>
            <!--这里是下拉小箭头-->
            <span class="icon" @click.stop="openPlaylistTabMenu">
              <svg-icon icon-class="dropdown" />
            </span>
          </div>

          <!--          专辑-->
          <div class="tab" :class="{ active: currentTab === 'albums' }" @click="updateCurrentTab('albums')">
            {{ $t('library.albums') }}
          </div>

          <!--          艺人-->
          <div class="tab" :class="{ active: currentTab === 'artists' }" @click="updateCurrentTab('artists')">
            {{ $t('library.artists') }}
          </div>
          <!--          MV-->
          <div class="tab" :class="{ active: currentTab === 'mvs' }" @click="updateCurrentTab('mvs')">
            {{ $t('library.mvs') }}
          </div>

          <!--          云盘-->
          <div class="tab" :class="{ active: currentTab === 'cloudDisk' }" @click="updateCurrentTab('cloudDisk')">
            {{ $t('library.cloudDisk') }}
          </div>

          <!--          听歌排行-->
          <div class="tab" :class="{ active: currentTab === 'playHistory' }" @click="updateCurrentTab('playHistory')">
            {{ $t('library.playHistory.title') }}
          </div>
        </div>

        <!--        机动按钮,根据页面选择性展示-->
        <button v-show="currentTab === 'playlists'" class="tab-button" @click="openAddPlaylistModal">
          <svg-icon icon-class="plus" />
          {{ $t('library.newPlayList') }}
        </button>
        <button v-show="currentTab === 'cloudDisk'" class="tab-button" @click="selectUploadFiles">
          <svg-icon icon-class="arrow-up-alt" />
          {{ $t('library.uploadSongs') }}
        </button>
      </div>

      <!--机动页面,选择性展示
      todo: 修改成链接式的,不要用v-show
      -->
      <div v-show="currentTab === 'playlists'">
        <div v-if="liked.playlists.length > 1">
          <CoverRow :items="filterPlaylists" type="playlist" sub-text="creator" :show-play-button="true" />
        </div>
      </div>

      <div v-show="currentTab === 'albums'">
        <CoverRow :items="liked.albums" type="album" sub-text="artist" :show-play-button="true" />
      </div>

      <div v-show="currentTab === 'artists'">
        <CoverRow :items="liked.artists" type="artist" :show-play-button="true" />
      </div>

      <div v-show="currentTab === 'mvs'">
        <MvRow :mvs="liked.mvs" />
      </div>

      <div v-show="currentTab === 'cloudDisk'">
        <TrackList
          :id="-8"
          :tracks="liked.cloudDisk"
          :column-number="3"
          type="cloudDisk"
          dbclick-track-func="playCloudDisk"
          :extra-context-menu-item="['removeTrackFromCloudDisk']"
        />
      </div>

      <div v-show="currentTab === 'playHistory'">
        <button
          :class="{
            'playHistory-button': true,
            'playHistory-button--selected': playHistoryMode === 'week',
          }"
          @click="playHistoryMode = 'week'"
        >
          {{ $t('library.playHistory.week') }}
        </button>
        <button
          :class="{
            'playHistory-button': true,
            'playHistory-button--selected': playHistoryMode === 'all',
          }"
          @click="playHistoryMode = 'all'"
        >
          {{ $t('library.playHistory.all') }}
        </button>
        <TrackList :tracks="playHistoryList" :column-number="1" type="tracklist" />
      </div>
    </div>

    <input ref="cloudDiskUploadInput" type="file" style="display: none" @change="uploadSongToCloudDisk" />

    <ContextMenu ref="playlistTabMenu">
      <div class="item" @click="changePlaylistFilter('all')">{{ $t('contextMenu.allPlaylists') }}</div>
      <hr />
      <div class="item" @click="changePlaylistFilter('mine')">{{ $t('contextMenu.minePlaylists') }}</div>
      <div class="item" @click="changePlaylistFilter('liked')">{{ $t('contextMenu.likedPlaylists') }}</div>
    </ContextMenu>

    <ContextMenu ref="playModeTabMenu">
      <div class="item" @click="playLikedSongs">{{ $t('library.likedSongs') }}</div>
      <hr />
      <div class="item" @click="playIntelligenceList">{{ $t('contextMenu.cardiacMode') }}</div>
    </ContextMenu>
  </div>
</template>

<script>
import { getLyric } from '@/api/track'
import { uploadSong } from '@/api/user'
import ContextMenu from '@/components/ContextMenu.vue'
import CoverRow from '@/components/CoverRow.vue'
import DailyTracksCard from '@/components/DailyTracksCard.vue'
import FMCard from '@/components/FMCard.vue'
import MvRow from '@/components/MvRow.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import TrackList from '@/components/TrackList.vue'
import locale from '@/locale'
import { isAccountLoggedIn } from '@/utils/auth'
import { dailyTask, randomNum } from '@/utils/common'
/**
 * Pick the lyric part from a string formed in `[timecode] lyric`.
 *
 * @param {string} rawLyric The raw lyric string formed in `[timecode] lyric`
 * @returns {string} The lyric part
 */
function extractLyricPart(rawLyric) {
  return rawLyric.split(']').pop().trim()
}

export default {
  name: 'Library',
  components: {
    SvgIcon,
    FMCard,
    DailyTracksCard,
    CoverRow,
    TrackList,
    MvRow,
    ContextMenu,
  },
  data() {
    return {
      show: false,
      likedSongs: [],
      lyric: undefined,
      currentTab: 'playlists',
      playHistoryMode: 'week',
    }
  },
  computed: {
    ...mapState(['data', 'liked']),
    /**
     * @returns {string[]}
     */
    pickedLyric() {
      /** @type {string?} */
      const lyric = this.lyric

      // Returns [] if we got no lyrics.
      if (!lyric) return []

      const lyricLine = lyric.split('\n').filter((line) => !line.includes('作词') && !line.includes('作曲'))

      // Pick 3 or fewer lyrics based on the lyric lines.
      const lyricsToPick = Math.min(lyricLine.length, 3)

      // The upperBound of the lyric line to pick
      const randomUpperBound = lyricLine.length - lyricsToPick
      const startLyricLineIndex = randomNum(0, randomUpperBound - 1)

      // Pick lyric lines to render.
      return lyricLine.slice(startLyricLineIndex, startLyricLineIndex + lyricsToPick).map(extractLyricPart)
    },
    playlistFilter() {
      return this.data.libraryPlaylistFilter || 'all'
    },
    filterPlaylists() {
      const playlists = this.liked.playlists.slice(1)
      const userId = this.data.user.userId
      if (this.playlistFilter === 'mine') {
        return playlists.filter((p) => p.creator.userId === userId)
      } else if (this.playlistFilter === 'liked') {
        return playlists.filter((p) => p.creator.userId !== userId)
      }
      return playlists
    },
    playHistoryList() {
      if (this.show && this.playHistoryMode === 'week') {
        return this.liked.playHistory.weekData
      }
      if (this.show && this.playHistoryMode === 'all') {
        return this.liked.playHistory.allData
      }
      return []
    },
  },
  created() {
    setTimeout(() => {
      if (!this.show) NProgress.start()
    }, 1000)
    this.loadData()
  },
  activated() {
    this.$parent.$refs.scrollbar.restorePosition()
    this.loadData()
    dailyTask()
  },
  methods: {
    ...mapActions(['showToast']),
    ...mapMutations(['updateModal', 'updateData']),
    loadData() {
      if (this.liked.songsWithDetails.length > 0) {
        NProgress.done()
        this.show = true
        this.$store.dispatch('fetchLikedSongsWithDetails')
        this.getRandomLyric()
      } else {
        this.$store.dispatch('fetchLikedSongsWithDetails').then(() => {
          NProgress.done()
          this.show = true
          this.getRandomLyric()
        })
      }
      // this.$store.dispatch('fetchLikedSongs');
      // this.$store.dispatch('fetchLikedPlaylist');
      // this.$store.dispatch('fetchLikedAlbums');
      // this.$store.dispatch('fetchLikedArtists');
      // this.$store.dispatch('fetchLikedMVs');
      // this.$store.dispatch('fetchCloudDisk');
      // this.$store.dispatch('fetchPlayHistory');
    },
    playLikedSongs() {
      this.$store.state.player.playPlaylistByID(this.liked.playlists[0].id, 'first', true)
    },
    playIntelligenceList() {
      this.$store.state.player.playIntelligenceListById(this.liked.playlists[0].id, 'first', true)
    },
    updateCurrentTab(tab) {
      //  没有登录
      if (!isAccountLoggedIn() && tab !== 'playlists') {
        this.showToast(locale.t('toast.needToLogin'))
        return
      }
      this.currentTab = tab
      // this.$parent.$refs.main.scrollTo({ top: 375, behavior: 'smooth' });
    },
    goToLikedSongsList() {
      this.$router.push({ path: '/library/liked-songs' })
    },
    getRandomLyric() {
      if (this.liked.songs.length === 0) return
      getLyric(this.liked.songs[randomNum(0, this.liked.songs.length - 1)]).then((data) => {
        if (data.lrc !== undefined) {
          const isInstrumental = data.lrc.lyric.split('\n').filter((l) => l.includes('纯音乐，请欣赏'))
          if (isInstrumental.length === 0) {
            this.lyric = data.lrc.lyric
          }
        }
      })
    },
    openAddPlaylistModal() {
      if (!isAccountLoggedIn()) {
        this.showToast(locale.t('toast.needToLogin'))
        return
      }
      this.updateModal({
        modalName: 'newPlaylistModal',
        key: 'show',
        value: true,
      })
    },
    openPlaylistTabMenu(e) {
      this.$refs.playlistTabMenu.openMenu(e)
    },
    openPlayModeTabMenu(e) {
      this.$refs.playModeTabMenu.openMenu(e)
    },
    changePlaylistFilter(type) {
      this.updateData({ key: 'libraryPlaylistFilter', value: type })
      window.scrollTo({ top: 375, behavior: 'smooth' })
    },
    selectUploadFiles() {
      this.$refs.cloudDiskUploadInput.click()
    },
    uploadSongToCloudDisk(e) {
      const files = e.target.files
      uploadSong(files[0]).then((result) => {
        if (result.code === 200) {
          let newCloudDisk = this.liked.cloudDisk
          newCloudDisk.unshift(result.privateCloud)
          this.$store.commit('updateLikedXXX', {
            name: 'cloudDisk',
            data: newCloudDisk,
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* 在你的样式表中添加以下样式 */

.mine {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 240px;
  background-color: #b7b697;
  border: #fff;
  border-radius: 10px;
  /* 内容上下显示 */
  flex-direction: column;
  // margin: 10px 0;

  .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin: 20px 30px;
  }

  h1 {
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin-left: 30px;
    margin-top: 1px;
    margin-bottom: 10px;
  }
}

.section-one {
  display: flex;
  margin-top: 24px;
}

.liked-songs {
  margin-top: 8px;
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  box-sizing: border-box;
  background: #f5f0f0;

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .svg-icon {
      color: #049880;
      fill: #b7b697;
    }

    .title {
      margin-top: 10px;
      font-size: 24px;
      font-weight: 700;
    }

    .sub-title {
      font-size: 15px;
      margin-top: 2px;
    }

    button {
      margin-bottom: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 44px;
      width: 44px;
      background: #04988a;
      border-radius: 50%;
      transition: 0.2s;
      cursor: default;

      .svg-icon {
        color: var(--color-primary-bg);
        margin-left: 4px;
        height: 16px;
        width: 16px;
      }

      &:hover {
        transform: scale(1.06);
        box-shadow: 0 6px 12px -4px rgba(0, 0, 0, 0.4);
      }

      &:active {
        transform: scale(0.94);
      }
    }
  }

  .top {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    opacity: 0.88;
    color: var(--color-primary);

    p {
      margin-top: 2px;
    }
  }
}

.section-two {
  margin-top: 54px;
  min-height: calc(100vh - 182px);
}

.tabs-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
  color: var(--color-text);

  .tab {
    font-weight: 600;
    padding: 8px 14px;
    margin-right: 14px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    transition: 0.2s;
    opacity: 0.68;

    &:hover {
      opacity: 0.88;
      background-color: var(--color-secondary-bg);
    }
  }

  .tab.active {
    opacity: 0.88;
    background-color: var(--color-secondary-bg);
  }

  .tab.dropdown {
    display: flex;
    align-items: center;
    padding: 0;
    overflow: hidden;

    .text {
      padding: 8px 3px 8px 14px;
    }

    .icon {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 8px 0 3px;

      .svg-icon {
        height: 16px;
        width: 16px;
      }
    }
  }
}

button.tab-button {
  color: var(--color-text);
  border-radius: 8px;
  padding: 0 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  opacity: 0.68;
  font-weight: 500;

  .svg-icon {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }

  &:hover {
    opacity: 1;
    background: var(--color-secondary-bg);
  }

  &:active {
    opacity: 1;
    transform: scale(0.92);
  }
}

button.playHistory-button {
  color: var(--color-text);
  border-radius: 8px;
  padding: 6px 8px;
  margin-bottom: 12px;
  margin-right: 4px;
  transition: 0.2s;
  opacity: 0.68;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 1;
    background: var(--color-secondary-bg);
  }

  &:active {
    transform: scale(0.95);
  }
}

button.playHistory-button--selected {
  color: var(--color-text);
  background: var(--color-secondary-bg);
  opacity: 1;
  font-weight: 700;

  &:active {
    transform: none;
  }
}

.for-you-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 78px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text);

  a {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.68;
  }
}

.index-row {
  margin-top: 54px;
}

.index-row.first-row {
  margin-top: 32px;
}
</style>
